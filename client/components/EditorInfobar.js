import React from 'react';

class EditorInfobar extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * Renders the EditorInfobar component.
     */
    render() {
        const { numWords, numLines, numBytes } = this.props.editorInfo;

        return (
            <div className="container-fluid container-info-bar">
                <div className="row">
                    <div className="col-md-12">
                        Markdown &emsp; UTF-8 &emsp;
                        <span className="info-text" id="info-words">
                        { `${numWords} word${(numWords == 1 ? '' : 's')}` }
                        </span>
                        <span className="info-text" id="info-lines">
                        { `${numLines} line${(numLines == 1 ? '' : 's')}` }
                        </span>
                        <span className="info-text" id="info-bytes">
                        { `${numBytes} byte${(numBytes == 1 ? '' : 's')}` }
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditorInfobar;
