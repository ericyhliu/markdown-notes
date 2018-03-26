import React from 'react';

class TextEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            autosavedText: this.props.autosavedText
        };
        
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    /**
     * When the user registers a key press (up) in the text editor, the 
     * inner text (that preserves whitespace) is passed up props.
     * 
     * @param {Event} e 
     */
    handleKeyUp(e) {
        this.props.handleEdit(e.target.innerText);
    }

    /**
     * Renders the TextEditor component.
     */
    render() {
        return (
            <div 
                id="markdown-editor" 
                className="ignore-latex"
                contentEditable="true" 
                autoFocus={true} 
                data-placeholder="Enter text here..."
                onKeyUp={(e) => {
                    this.handleKeyUp(e);
                }}
                tabIndex="0"
                suppressContentEditableWarning={true}>
                { this.state.autosavedText }
            </div>
        );
    }
}

export default TextEditor;
