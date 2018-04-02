/**
 * Load note with given name id from user-data directory.
 * 
 * @param {string} id 
 * @param {Function} callback
 */

const fs = require('fs');
const path = require('path');

const INDEX_FILE_PATH = path.join(__dirname, '..', '..', 'user-data', 'index.json');

const loadNote = (id, callback) => {
    fs.readFile(INDEX_FILE_PATH, (err, data) => {
        if (err) {
            return callback({
                error: 'index file not found'
            }, undefined);
        }

        data = JSON.parse(data);

        // Check that the file with the id exists in the index.json file:
        data.files = data.files.filter((x) => {
            return x.id == id;
        });

        if (data.files.length === 0) {
            return callback({
                error: true
            }, undefined);
        }

        const USER_DATA_FILE_PATH = path.join(__dirname, '..', '..', 'user-data', `${id}.md`) 
        fs.readFile(USER_DATA_FILE_PATH, (err, data) => {
            if (err) {
                return callback({
                    error: true
                }, undefined);
            }

            return callback(undefined, {
                data: data.toString()
            });
        });
    });
};

module.exports = {
    loadNote
};
