import React from 'react';

class EditorInfobar extends React.Component {
    constructor(props) {
        super(props);
        // state: wordCount, lineCount, byteCount
    }

    render() {
        return (
            <div className="container-fluid container-info-bar">
                <div className="row">
                    <div className="col-md-12">
                        Markdown &emsp; UTF-8 &emsp; <span className="info-text" id="info-words"></span> <span className="info-text" id="info-lines"></span> <span className="info-text" id="info-bytes"></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditorInfobar;
