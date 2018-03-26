import React from 'react';

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autosavedText: this.props.autosavedText
        };
        
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleKeyUp(e) {
        this.props.handleEdit(e.target.innerText);
    }

    render() {
        return (
            <div 
                id="markdown-editor" 
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
