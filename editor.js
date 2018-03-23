$(function() {
    
    const TAB_KEY = 9;
    const ENTER_KEY = 13;
    const SPACE_CHAR = ' ';
    const NEWLINE_CHAR = '\n';

    // Autosave editor on page load:
    let lastAutosaveTime = moment();
    autosaveEditor(true);
    updateInfoBar();

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

    $("#markdown-editor").on("keydown", function(e) {
        if (e.keyCode == TAB_KEY) {
            document.execCommand("insertHTML", false, "&#9");
            e.preventDefault();
        }

        setTimeout(function() {
            updatePreview();
        }, 0);

        setTimeout(function() {
            autosaveEditor();
        }, 0);

        setTimeout(function() {
            updateInfoBar();
        }, 0);
    });

    $("#modalLoginAvatar").on('hidden.bs.modal', function() {
        // Reset the modal input:
        $("#input-new-note").val("");
    });

    $("#search-bar").on("keyup", function(e) {
        const searchQuery = $(this).val();

        if (e.keyCode == ENTER_KEY) {
            e.preventDefault();
            updateSearchArea(searchQuery);
        }

        // Reset the dynamic search area:
        if (!searchQuery) {
            resetSearchArea();
        }
    });

    function autosaveEditor(override) {
        const currentTime = moment();
        
        if (!override && (currentTime - lastAutosaveTime < 10000)) {
            return;
        }
        
        lastAutosaveTime = currentTime;

        const markdownRawText = $("#markdown-editor").text();

        $("#autosave-datetime").text(moment(lastAutosaveTime).format('MM/DD/YYYY h:mm:ss a'));
    }

    function updatePreview() {
        const markdownRawText = document.getElementById("markdown-editor").innerText;
        const markdownHTML = marked(markdownRawText);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "preview"]);
        $("#preview").html(markdownHTML);
    }

    function updateSearchArea(searchQuery) {
        // test
        console.log(searchQuery);
    }

    function resetSearchArea() {
        console.log('reset');
    }

    function updateInfoBar() {
        const markdownRawText = document.getElementById("markdown-editor").innerText;
        let numWords = markdownRawText.length == 0 ? 0 : markdownRawText.trim().split(/\s+/).length;
        let numLines = markdownRawText.split(/\r\n|\r|\n/).length;
        numLines = numLines >= 3 ? --numLines : numLines;
        let numBytes = markdownRawText.length;

        $("#info-words").text(`${numWords} ${(numWords == 1 ? 'word' : 'words')}`);
        $("#info-lines").text(`${numLines} ${(numLines == 1 ? 'line' : 'lines')}`);
        $("#info-bytes").text(`${numBytes} ${(numBytes == 1 ? 'byte' : 'bytes')}`);
    }
});