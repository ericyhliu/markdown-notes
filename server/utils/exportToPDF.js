/**
 * Exports the given markdown file to PDF.
 * 
 * @param {string} id 
 * @param {Function} callback
 */
const fs = require('fs');
const path = require('path');
const markdownpdf = require('markdown-pdf');

const exportToPDF = (id, callback) => {
    const USER_DATA_FILE_PATH = path.join(__dirname, '..', '..', 'user-data', `${id}.md`);
    const OUTPUT_FILE_PATH = path.join(__dirname, '..', '..', 'temp', `${id}.pdf`);
    
    markdownpdf({
        cssPath: path.join(__dirname, '..', 'export-pdf', 'export-pdf-styles.css')
    })
    .from(USER_DATA_FILE_PATH)
    .to(OUTPUT_FILE_PATH, () => {
        return callback(OUTPUT_FILE_PATH);
    });
};

module.exports = {
    exportToPDF
};
