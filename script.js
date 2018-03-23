$(function() {
    
    const TAB_KEY = 9;
    const ENTER_KEY = 13;

    // Autosave editor on page load:
    let lastAutosaveTime = moment();
    autosaveEditor(true);
    updateFileSize(0);

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
        // test
        console.log('reset');
    }
});
