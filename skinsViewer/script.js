const fs = require('fs');

const urls = [PASTE HERE THE CONTENT OF OUTPUT.JSON];

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
    console.error('Erreur lors de l\'écriture du fichier :', err);
  } else {
    console.log('Le fichier output2.json a été créé avec succès.');
  }
});
