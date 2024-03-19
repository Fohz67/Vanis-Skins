const fs = require('fs');

const filePath = process.argv[2];

let urls = [];
try {
    const data = fs.readFileSync(filePath, 'utf8');

  urls = JSON.parse(data);
} catch (error) {
    console.error('Error reading or parsing the file:', error);
    return;
}

const filteredUrls = urls
  .filter(url => url.startsWith("https://skins.vanis.io/s/"))
  .map(url => {
    const key = url.replace(/^https:\/\/skins\.vanis\.io\/s\//, '');
    const cleanedKey = key.replace(/[^a-zA-Z0-9]/g, '');
    return `"${cleanedKey}": "${url}"`;
  });

const jsonString = `{ ${filteredUrls.join(', ')} }`;

fs.writeFile('output2.json', jsonString, 'utf8', (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('The file output2.json has been successfully created.');
  }
});
