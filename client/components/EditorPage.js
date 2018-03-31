import React from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

// Components:
import EditorNavbar from './EditorNavbar';
import EditorInfobar from './EditorInfobar';
import TextEditor from './TextEditor';
import LivePreview from './LivePreview';

// Utils:
import getMarkdownInfo from '../utils/getMarkdownInfo';
import mapMenuItemToSnippet from '../utils/mapMenuItemToSnippet';

const LOCAL_STORAGE_MARKDOWN_NOTES = 'MarkdownNotesAutosave';

class EditorPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            color: '',
            redirectToMainPage: false,
            markdownText: '',
            preloadedText: '',
            editorInfo: {
                numWords: 0,
                numLines: 1,
                numBytes: 0
            }
        };

        this.handleMenuBarItemClick = this.handleMenuBarItemClick.bind(this);
        this.handleSaveEditor = this.handleSaveEditor.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.insertTextAtCursor = this.insertTextAtCursor.bind(this);
    }

    /**
     * When the component is mounted, load the text from file:
     */
    componentWillMount() {
        if (!this.props.location.state) {
            this.setState(() => ({
                redirectToMainPage: true
            }));
            return;
        } 

        const currentStateID = this.props.location.state.id;

        this.setState(() => ({
            id: currentStateID,
            redirectToMainPage: false
        }));

        fetch(`/file/contents/${currentStateID}`)
        .then((resultPromise) => {
            return resultPromise.json();
        })
        .then((result) => {
            // Load from autosave if possible, otherwise load default:
            let localStorageData = localStorage[LOCAL_STORAGE_MARKDOWN_NOTES];
            
            if (localStorageData) {
                localStorageData = JSON.parse(localStorageData);
            }

            if (localStorageData &&
                localStorageData.id == currentStateID &&
                localStorageData.markdownText) {
                
                this.setState(() => ({
                    preloadedText: localStorageData.markdownText
                }));
            } else {
                this.setState(() => ({
                    preloadedText: result.success.data
                }));
            }
        });
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

    /**
     * Handles saving the editor text content on clicking 'Done'.
     */
    handleSaveEditor() {
        fetch('/file/save', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    id: this.state.id,
                    markdownText: this.state.markdownText ? 
                        this.state.markdownText :
                        this.state.preloadedText
                }
            })
        })
        .then((resultPromise) => {
            return resultPromise.json();
        })
        .then((result) => {
            if (result.success) {
                this.setState(() => ({
                    redirectToMainPage: true
                }));
            }
        });
    }

    /**
     * When the markdown text on the editor side changes, the state of the page
     * with respect to the markdownText, editorInfo gets updated. On the preview side, all Latex 
     * is rendered with MathJax. The markdown text is autosaved.
     * 
     * @param {string} markdownText 
     */
    handleEdit(markdownText) {
        this.setState(() => ({
            markdownText,
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

        localStorage[LOCAL_STORAGE_MARKDOWN_NOTES] = JSON.stringify({
            id: this.state.id,
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
        if (this.state.redirectToMainPage) {
            return <Redirect to={'/'} />
        }

        console.log('editorpage', this.state.id);

        return (
            <div>
                <EditorNavbar 
                    lastAutosaveTime={ this.state.lastAutosaveTime }
                    handleMenuBarItemClick={ this.handleMenuBarItemClick }
                    handleSaveEditor={ this.handleSaveEditor }
                    color={ this.state.color }
                />

                <div className="container-fluid container-editor">
                    <div className="row">
                        <div className="col-md-6 container-markdown-editor">
                            <TextEditor 
                                preloadedText={ this.state.preloadedText }
                                handleEdit={ this.handleEdit }
                            />
                        </div>
                        <div className="col-md-6 container-preview">
                            <LivePreview 
                                markdownText={ 
                                    this.state.markdownText ?
                                    this.state.markdownText :
                                    this.state.preloadedText
                                }
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
