import React from 'react';
import EditorNavbar from './EditorNavbar';
import EditorInfobar from './EditorInfobar';

class EditorPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <EditorNavbar />

                <div className="container-fluid container-editor">
                    <div className="row">
                        <div className="col-md-6 container-markdown-editor">
                            <div id="markdown-editor" className="" contentEditable="true" autofocus data-placeholder="Enter text here..."></div>
                        </div>
                        <div className="col-md-6 container-preview">
                            <div id="preview" className=""></div>
                        </div>
                    </div>
                </div>

                <EditorInfobar />
            </div>
        );
    }
};

export default EditorPage;
