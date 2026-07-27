import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/db.js';
import { OAuth2Client } from 'google-auth-library';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_culture_jwt_key_123';
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
};

export const signup = async (req, res) => {
    try {
        const { username, email, password, fullName } = req.body;

        if (!username || !email || !password || !fullName) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user exists
        const userCheck = await query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
        if (userCheck.rows.length > 0) {
            return res.status(409).json({ error: 'Email or Username already in use' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user
        const result = await query(
            'INSERT INTO users (username, email, password, full_name) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, hashedPassword, fullName]
        );
        const user = result.rows[0];

        // Create email verification token
        const token = uuidv4();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        await query(
            'INSERT INTO email_verifications (user_id, token, expires_at) VALUES ($1, $2, $3)',
            [user.id, token, expiresAt]
        );

        // Send verification email
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${token}`;
            const mailOptions = {
                from: `"CultureConnect" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Verify your email address - CultureConnect',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2>Welcome to CultureConnect, ${fullName}!</h2>
                        <p>Please click the button below to verify your email address:</p>
                        <a href="${verifyUrl}" style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
                        <p>If you didn't create this account, you can safely ignore this email.</p>
                    </div>
                `
            };
            transporter.sendMail(mailOptions).catch(err => console.error('Failed to send verification email', err));
        }

        res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Server error during signup' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const result = await query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user || !user.password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        if (!user.is_verified) {
            return res.status(403).json({ error: 'Please verify your email before logging in.' });
        }

        const token = generateToken(user);

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, username: user.username, email: user.email, fullName: user.full_name, avatar: user.avatar }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error during login' });
    }
};

export const googleAuth = async (req, res) => {
    try {
        const { accessToken } = req.body;
        if (!accessToken) {
            return res.status(400).json({ error: 'Access token is required' });
        }

        // Fetch user info from Google using the access token
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        
        if (!response.ok) {
            return res.status(401).json({ error: 'Invalid Google access token' });
        }
        
        const payload = await response.json();
        
        const email = payload.email;
        const name = payload.name;
        const picture = payload.picture;
        const googleId = payload.sub;

        let result = await query('SELECT * FROM users WHERE email = $1', [email]);
        let user = result.rows[0];

        if (!user) {
            // Create user if not exists
            const username = email.split('@')[0] + '_' + Math.floor(Math.random() * 1000);
            const insertResult = await query(
                'INSERT INTO users (username, email, full_name, google_id, avatar, is_verified) VALUES ($1, $2, $3, $4, $5, true) RETURNING *',
                [username, email, name, googleId, picture]
            );
            user = insertResult.rows[0];
        } else if (!user.google_id) {
            // Link google id to existing account
            await query('UPDATE users SET google_id = $1, avatar = COALESCE(avatar, $2), is_verified = true WHERE id = $3', [googleId, picture, user.id]);
        }

        const token = generateToken(user);
        res.json({
            message: 'Google auth successful',
            token,
            user: { id: user.id, username: user.username, email: user.email, fullName: user.full_name, avatar: user.avatar }
        });
    } catch (err) {
        console.error('Google auth error:', err);
        res.status(500).json({ error: 'Server error during Google authentication' });
    }
};

export const getMe = async (req, res) => {
    try {
        const result = await query('SELECT id, username, email, full_name, avatar, is_verified, created_at FROM users WHERE id = $1', [req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user: result.rows[0] });
    } catch (err) {
        console.error('Get me error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(400).json({ error: 'Token is required' });

        const result = await query('SELECT * FROM email_verifications WHERE token = $1 AND expires_at > NOW()', [token]);
        const verification = result.rows[0];

        if (!verification) {
            return res.status(400).json({ error: 'Invalid or expired verification token' });
        }

        await query('UPDATE users SET is_verified = true WHERE id = $1', [verification.user_id]);
        await query('DELETE FROM email_verifications WHERE id = $1', [verification.id]);

        res.json({ message: 'Email verified successfully. You can now log in.' });
    } catch (err) {
        console.error('Verify email error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        const result = await query('SELECT id, full_name FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            // Return success even if user not found to prevent email enumeration
            return res.json({ message: 'If that email exists, a password reset link has been sent.' });
        }

        const token = uuidv4();
        const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

        // Invalidate old tokens
        await query('DELETE FROM password_resets WHERE user_id = $1', [user.id]);
        await query('INSERT INTO password_resets (user_id, token, expires_at) VALUES ($1, $2, $3)', [user.id, token, expiresAt]);

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
            const mailOptions = {
                from: `"CultureConnect" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Reset your password - CultureConnect',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2>Password Reset Request</h2>
                        <p>Hi ${user.full_name || 'User'},</p>
                        <p>You requested to reset your password. Click the button below to set a new password:</p>
                        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
                        <p>If you didn't request this, please ignore this email. This link expires in 1 hour.</p>
                    </div>
                `
            };
            transporter.sendMail(mailOptions).catch(err => console.error('Failed to send reset email', err));
        }

        res.json({ message: 'If that email exists, a password reset link has been sent.' });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) return res.status(400).json({ error: 'Token and new password are required' });

        const result = await query('SELECT * FROM password_resets WHERE token = $1 AND expires_at > NOW()', [token]);
        const resetRecord = result.rows[0];

        if (!resetRecord) {
            return res.status(400).json({ error: 'Invalid or expired password reset token' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, resetRecord.user_id]);
        await query('DELETE FROM password_resets WHERE id = $1', [resetRecord.id]);

        res.json({ message: 'Password reset successfully. You can now log in with your new password.' });
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};
