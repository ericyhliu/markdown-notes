/**
 * Load the settings/content index file from the user-data directory, but if 
 * this file is corrupt or non-existent, it creates initializes it.
 */
const fs = require('fs');
const path = require('path');

const INDEX_FILE_PATH = path.join(__dirname, '..', '..', 'user-data', 'index.json');

const loadIndexFile = (callback) => {
    fs.readFile(INDEX_FILE_PATH, (err, data) => {
        // File is corrupt of non-existent, initialize index.json file:
        if (err) {
            const emptyIndex = {
                color: "#283593",
                files: []
            };

            fs.writeFileSync(INDEX_FILE_PATH, JSON.stringify(emptyIndex, undefined, 2));
            return callback(emptyIndex);
        }

        return callback(JSON.parse(data));
    });
};

module.exports = {
    loadIndexFile
};
