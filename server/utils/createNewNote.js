/**
 * Creates a new note with uuid as file name, and returns an Object with 
 * data corresponding to the note (i.e. title, id, dateCreated), then updates
 * the index file.
 */

const fs = require('fs');
const path = require('path');
const moment = require('moment');
const uuid = require('uuid');
const INDEX_FILE_PATH = path.join(__dirname, '..', '..', 'user-data', 'index.json');

const createNewNote = (title, callback) => {
    fs.readFile(INDEX_FILE_PATH, (err, data) => {
        if (err) {
            return callback({
                error: true
            }, undefined);
        }

        data = JSON.parse(data);

        let set = new Set();
        data.files.forEach((x) => {
            set.add(x.id);
        });

        // Generate unique uuid for the note:
        let id = uuid();
        while (true) {
            if (set.has(id)) {
                id = uuid();
            } else {
                break;
            }
        }

        // Update index.json file:
        const newNote = { title, id, dateCreated: moment().valueOf() };
        data.files.push(newNote);
        fs.writeFileSync(INDEX_FILE_PATH, JSON.stringify(data, undefined, 2));

        // Create new file with id name:
        const USER_DATA_FILE_PATH = path.join(__dirname, '..', '..', 'user-data', `${newNote.id}.md`)
        fs.writeFileSync(USER_DATA_FILE_PATH, '');

        return callback(undefined, newNote);
    });
};

module.exports = {
    createNewNote
};
