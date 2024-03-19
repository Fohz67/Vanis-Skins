const fs = require('fs');
const filePath = process.argv[2];

let jsonData = {};
try {
    const data = fs.readFileSync(filePath, 'utf8');

    jsonData = JSON.parse(data);
} catch (error) {
    console.error('Error reading or parsing the file:', error);
    process.exit(84);
}

const allSkins = [];

for (const key in jsonData) {
    const subObj = jsonData[key];

    for (const subKey in subObj) {
        const skinsValue = subObj[subKey].skins;

        if (skinsValue && typeof skinsValue === 'string') {
            try {
                const skinsArray = JSON.parse(skinsValue);

                allSkins.push(...skinsArray.filter(skin => skin.trim() !== ''));
            } catch (error) {
                console.error(`Error while parsing JSON string for key ${key}/${subKey}`);
            }
        }
    }
}

const outputJson = JSON.stringify(allSkins, null, 2);

fs.writeFile('output.json', outputJson, 'utf8', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('Output has been written to output.json');
    }
});
