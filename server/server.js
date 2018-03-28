const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();

// Utils:
const { loadIndexFile } = require('./utils/loadIndexFile');
const { createNewNote } = require('./utils/createNewNote');
const { deleteNote } = require('./utils/deleteNote');
const { loadNote } = require('./utils/loadNote');
const { saveNote } = require('./utils/saveNote');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 5000;

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: '<Markdown Notes Secret>',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.get('/file/settings', (req, res) => {
    loadIndexFile((data) => {
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify(data));
    });
});

app.post('/file/add-new-note', (req, res) => {
    createNewNote(req.body.data, (err, data) => {
        res.setHeader('Content-Type', 'application/json');

        if (err) {
            return res.send(JSON.stringify({
                error: 'There was an error adding a new note.'
            }));
        }

        return res.send(JSON.stringify({
            success: 'New note successfully added.'
        }));
    });
});

app.delete('/file/delete-note', (req, res) => {
    deleteNote(req.body.data, (err, data) => {
        res.setHeader('Content-Type', 'application/json');

        if (err) {
            return res.send(JSON.stringify({
                error: 'There was an error deleting the note.'
            }));
        }

        return res.send(JSON.stringify({
            success: 'Note successfully deleted.'
        }));
    });
});

app.get('/file/contents/:id', (req, res) => {
    loadNote(req.params.id, (err, data) => {
        res.setHeader('Content-Type', 'application/json');

        if (err) {
            return res.send(JSON.stringify({
                error: 'There was an error opening the note.'
            }));
        }

        return res.send(JSON.stringify({
            success: data
        }));
    });
});

app.post('/file/save', (req, res) => {
    saveNote(req.body.data, (err, data) => {
        res.setHeader('Content-Type', 'application/json');

        if (err) {
            return res.send(JSON.stringify({
                error: 'There was an error saving the note.'
            }));
        }

        return res.send(JSON.stringify({
            success: 'Note successfully saved.'
        }));
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = {
    app
};
