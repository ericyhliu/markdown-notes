import React from 'react';
import moment from 'moment';
import EditorNavbar from './EditorNavbar';
import EditorInfobar from './EditorInfobar';
import TextEditor from './TextEditor';
import LivePreview from './LivePreview';

import getMarkdownInfo from '../utils/getMarkdownInfo';
import mapMenuItemToSnippet from '../utils/mapMenuItemToSnippet';

class EditorPage extends React.Component {
    constructor(props) {
        super(props);

        // id: this.props.id

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
    }

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

    handleMenuBarItemClick(menuItem) {
        const snippet = mapMenuItemToSnippet(menuItem);
    }

    handleSaveEditor() {
        console.log('save editor');
    }

    handleEdit(markdownText) {
        this.setState(() => ({
            markdownText,
            autosavedText: '',
            editorInfo: getMarkdownInfo(markdownText)
        }));

        this.handleAutosave(markdownText, false);
    }

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
