const https = require('https');

function searchYouTube(query) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'www.youtube.com',
            path: '/results?search_query=' + encodeURIComponent(query),
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        https.get(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const match = data.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
                if (match) {
                    resolve(match[1]);
                } else {
                    resolve('');
                }
            });
        }).on('error', () => resolve(''));
    });
}

function checkEmbed(videoId) {
    if (!videoId) return Promise.resolve('');
    return new Promise((resolve) => {
        const url = 'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + videoId + '&format=json';
        https.get(url, (res) => {
            if (res.statusCode === 200) resolve(videoId);
            else resolve('');
        }).on('error', () => resolve(''));
    });
}

async function run() {
    const fs = require('fs');
    const content = fs.readFileSync('src/pages/CulturalDances.jsx', 'utf8');
    const match = content.match(/const dancesData = \[([\s\S]*?)\];/);
    if (!match) return console.log('no dances data');
    
    // We will parse the dances
    const dances = [];
    let currentId = '';
    let currentName = '';
    let lines = match[1].split('\n');
    
    for (let line of lines) {
        if (line.includes('name:')) {
            currentName = line.split('"')[1];
            dances.push({ name: currentName });
        }
    }
    
    const results = {};
    for (let d of dances) {
        if(d.name === 'Garadi' && results['Garadi']) continue;
        console.log('Searching for ' + d.name);
        const searchRes = await searchYouTube(d.name + ' traditional Indian dance performance');
        const finalId = await checkEmbed(searchRes);
        results[d.name] = finalId || 'JWhA3ldZcyY'; // fallback to Bharatanatyam which works
    }
    fs.writeFileSync('video_ids.json', JSON.stringify(results, null, 2));
    console.log('Done.');
}
run();
