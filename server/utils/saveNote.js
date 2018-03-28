/**
 * Saves the markdown text to the given file name id.
 * 
 * @param {string} id 
 * @param {string} markdownText
 * @param {Function} callback 
 */

const fs = require('fs');
const path = require('path');

const saveNote = ({ id, markdownText }, callback) => {
    const USER_DATA_FILE_PATH = path.join(__dirname, '..', '..', 'user-data', `${id}.md`) 
    fs.writeFile(USER_DATA_FILE_PATH, markdownText, undefined, (err) => {
        if (err) {
            return callback({
                error: true
            }, undefined);
        }

        return callback(undefined, {
            success: true
        });
    });
};

module.exports = {
    saveNote
};
