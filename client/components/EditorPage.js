import React from 'react';
import moment from 'moment';

// Components:
import EditorNavbar from './EditorNavbar';
import EditorInfobar from './EditorInfobar';
import TextEditor from './TextEditor';
import LivePreview from './LivePreview';

// Utils:
import getMarkdownInfo from '../utils/getMarkdownInfo';
import mapMenuItemToSnippet from '../utils/mapMenuItemToSnippet';

class EditorPage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            lastAutosaveTime: moment(),
            markdownText: '',
            autosavedText: '',
            editorInfo: {
                numWords: 0,
                numLines: 1,
                numBytes: 0
            }
        };

        this.handleMenuBarItemClick = this.handleMenuBarItemClick.bind(this);
        this.handleSaveEditor = this.handleSaveEditor.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleAutosave = this.handleAutosave.bind(this);
        this.insertTextAtCursor = this.insertTextAtCursor.bind(this);
    }

    /**
     * When component is about to mount, autosaved data is loaded into the 
     * editor, if possible.
     */
    componentWillMount() {
        let localStorageData = localStorage['MarkdownNotesAutoSave'];

        if (localStorageData) {
            localStorageData = JSON.parse(localStorageData);
        }

        if (localStorageData && localStorageData.id == '123') {
            const markdownText = localStorageData.markdownText;
            this.setState(() => ({
                lastAutosaveTime: moment(),
                markdownText,
                autosavedText: markdownText,
                editorInfo: getMarkdownInfo(markdownText)
            }));
        } else {
            localStorage.clear();
        }
    }

    /**
     * Gets the corresponding snippet to the selected menuItem, and inserts
     * the snippet at the current cursor position.
     * 
     * @param {string} menuItem 
     */
    handleMenuBarItemClick(menuItem) {
        this.insertTextAtCursor(mapMenuItemToSnippet(menuItem));
    }

    handleSaveEditor() {
        console.log('save editor');
    }

    /**
     * When the markdown text on the editor side changes, the state of the page
     * with respect to the markdownText, autosavedText, editorInfo gets updated.
     * On the preview side, all Latex is rendered with MathJax. The markdown text
     * is autosaved.
     * 
     * Note: autosavedText is reset.
     * 
     * @param {string} markdownText 
     */
    handleEdit(markdownText) {
        this.setState(() => ({
            markdownText,
            autosavedText: '',
            editorInfo: getMarkdownInfo(markdownText)
        }));
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "preview"]);
        this.handleAutosave(markdownText, false);
    }

    /**
     * If the time between now and the lastAutosaveTime is more than 1000 ms
     * (1 second) then the current markdownText is autosaved to localStorage
     * along with the id of the note.
     * 
     * @param {string} markdownText 
     * @param {boolean} override 
     */
    handleAutosave(markdownText, override) {
        const currentTime = moment();

        if (!override && (currentTime - this.state.lastAutosaveTime < 1000)) {
            return;
        }

        this.setState(() => ({
            lastAutosaveTime: currentTime
        }));

        localStorage['MarkdownNotesAutoSave'] = JSON.stringify({
            id: '123',
            markdownText
        });
    }

    /**
     * Inserts the specified text at the current cursor position. (This is surprisingly cumbersome, 
     * see 'https://stackoverflow.com/questions/1064089/inserting-a-text-where-cursor-is-using-javascript-jquery'
     * for details.)
     * 
     * @param {string} text 
     */
    insertTextAtCursor(text) {
        let sel, range;
        if (window.getSelection) {
            // IE9 and non-IE:
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
    
                // Range.createContextualFragment() would be useful here but is
                // non-standard and not supported in all browsers (IE9, for one):
                let el = document.createElement("div");
                el.innerHTML = text;
                let frag = document.createDocumentFragment(), node, lastNode;
                while ( (node = el.firstChild) ) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
                
                // Preserve the selection:
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type != "Control") {
            // IE < 9:
            document.selection.createRange().pasteHTML(text);
        }
    }

    /**
     * Renders the EditorPage component.
     */
    render() {
        return (
            <div>
                <EditorNavbar 
                    lastAutosaveTime={ this.state.lastAutosaveTime }
                    handleMenuBarItemClick={ this.handleMenuBarItemClick }
                    handleSaveEditor={ this.handleSaveEditor }
                />

                <div className="container-fluid container-editor">
                    <div className="row">
                        <div className="col-md-6 container-markdown-editor">
                            <TextEditor 
                                autosavedText={ this.state.autosavedText }
                                handleEdit={ this.handleEdit }
                            />
                        </div>
                        <div className="col-md-6 container-preview">
                            <LivePreview 
                                markdownText={ this.state.markdownText }
                            />
                        </div>
                    </div>
                </div>

                <EditorInfobar 
                    editorInfo={ this.state.editorInfo }
                />
            </div>
        );
    }
};

export default EditorPage;
