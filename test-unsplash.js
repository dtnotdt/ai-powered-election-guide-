const https = require('https');
https.get('https://unsplash.com/s/photos/india-election', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/photo-[a-zA-Z0-9-]+/g);
    console.log(Array.from(new Set(matches)).slice(0, 5));
  });
});
