/**
 * Deletes the note with the given id.
 * 
 * @param {string} id 
 */
const fs = require('fs');
const path = require('path');
const INDEX_FILE_PATH = path.join(__dirname, '..', '..', 'user-data', 'index.json');

const deleteNote = (id, callback) => {
    fs.readFile(INDEX_FILE_PATH, (err, data) => {
        if (err) {
            return callback({
                error: true
            }, undefined);
        }

        data = JSON.parse(data);

        data.files = data.files.filter((x) => {
            return x.id != id;
        });

        // Update index.json file:
        fs.writeFileSync(INDEX_FILE_PATH, JSON.stringify(data, undefined, 2));

        // Delete file with id name:
        const USER_DATA_FILE_PATH = path.join(__dirname, '..', '..', 'user-data', `${id}.md`) 
        fs.unlinkSync(USER_DATA_FILE_PATH);
        return callback(undefined, id);
    });
};

module.exports = {
    deleteNote
};
