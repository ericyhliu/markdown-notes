/**
 * Changes the color scheme in the settings.json file.
 * 
 * @param {string} hexColor
 * @param {Function} callback
 */
const fs = require('fs');
const path = require('path');
const INDEX_FILE_PATH = path.join(__dirname, '..', '..', 'user-data', 'index.json');

const changeColorScheme = (hexColor, callback) => {
    fs.readFile(INDEX_FILE_PATH, (err, data) => {
        if (err) {
            return callback({
                error: true
            }, undefined);
        }

        data = JSON.parse(data);
        data.color = hexColor;

        // Update index.json file:
        fs.writeFileSync(INDEX_FILE_PATH, JSON.stringify(data, undefined, 2));

        return callback(undefined, hexColor);
    });
};

module.exports = {
    changeColorScheme
};
