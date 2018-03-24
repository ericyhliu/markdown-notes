// // require('./config/config');

// const _ = require('lodash');
// const bodyParser = require('body-parser');
// const express = require('express');
// const fs = require('fs');
// const marked = require('marked');
// const request = require('request');
// const path = require('path');
// const session = require('express-session');
// const argv = require('yargs').argv;

// var app = express();

// const publicPath = path.join(__dirname, '..', 'public');
// const port = process.env.PORT || 5000;
// app.use(express.static(publicPath));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// app.use(session({
//   secret: '<Algorithm Helper Secret>',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: false
//   }
// }));

// // Start server:
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });

// app.get('/api/gcs-signed-url/:category/:topic/:article', (req, res) => {
//   const articleFilePath = `/categories/${req.params.category}/${req.params.topic}/${req.params.article}.md`;

//   retrieveArticleSignedUrl(gcsStorage, articleFilePath)
//   .then((signedUrl) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify({ 
//       signedUrl
//     }));
//   })
//   .catch((err) => {
//     res.sendFile(path.join(publicPath, 'index.html'));
//   });
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index.html'));
// });

// module.exports = {
//   app
// };
