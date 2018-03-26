import marked from 'marked';

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

/**
 * Renders the markdown text to HTML using marked.
 * 
 * @param {string} markdownText 
 */
const renderMarkdown = (markdownText) => {
    return marked(markdownText);
}

export default renderMarkdown;
