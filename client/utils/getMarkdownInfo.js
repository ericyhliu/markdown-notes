/**
 * Returns an Object with the number of words, number of lines, and number
 * of bytes of the markdownRawText in properties numWords, numLines, and 
 * numBytes, respectively.
 * 
 * Note: 'words' are whitespace delimited strings, 'lines' are line break 
 * delimited strings, 'bytes' are any character.
 * 
 * @param {string} markdownRawText 
 */
const getMarkdownInfo = (markdownRawText) => {
    let numWords = markdownRawText.length == 0 ? 0 : markdownRawText.trim().split(/\s+/).length;
    let numLines = markdownRawText.split(/\r\n|\r|\n/).length;
    numLines = numLines >= 3 ? --numLines : numLines;
    let numBytes = markdownRawText.length;

    return {
        numWords,
        numLines,
        numBytes
    };
};

export default getMarkdownInfo;
