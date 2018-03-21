$(function() {
    
    // Initialize Marked options:
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

    // Bring autofocus to the Markdown Editor:
    $(window).on("load", function() {
        $("#markdown-editor").focus();
    });

    $("#markdown-editor").on("keyup", function(e) {
        setTimeout(function() {
            updatePreview();
        }, 0);
    });

    function updatePreview() {
        const markdownRawText = document.getElementById("markdown-editor").innerText;
        const markdownHTML = marked(markdownRawText);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "preview"]);
        $("#preview").html(markdownHTML);
    }
});
