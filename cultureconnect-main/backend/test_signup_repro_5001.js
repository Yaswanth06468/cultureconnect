
const signup = async () => {
    try {
        const res = await fetch('http://localhost:5001/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'testuser_' + Date.now(), password: 'testpassword' })
        });
        const data = await res.json();
        console.log('Response Status:', res.status);
        console.log('Response Body:', data);
    } catch (err) {
        console.error('Fetch error:', err);
    }
};

signup();
