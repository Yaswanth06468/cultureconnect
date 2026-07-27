import fs from 'fs';

const serverJsPath = 'server.js';
const lines = fs.readFileSync(serverJsPath, 'utf8').split('\n');

// Find start and end indices
const startRegex = /\/\/ Google Sign-Up \/ Sign-In Endpoint/;
const endRegex = /app\.get\('\/api\/posts', async/;

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
    if (startRegex.test(lines[i])) {
        startIndex = i;
    }
    if (endRegex.test(lines[i]) && startIndex !== -1) {
        endIndex = i;
        break;
    }
}

if (startIndex !== -1 && endIndex !== -1) {
    const newLines = [
        ...lines.slice(0, startIndex),
        ...lines.slice(endIndex)
    ];
    fs.writeFileSync(serverJsPath, newLines.join('\n'));
    console.log('Successfully removed old auth routes.');
} else {
    console.log('Could not find start or end index.');
}
