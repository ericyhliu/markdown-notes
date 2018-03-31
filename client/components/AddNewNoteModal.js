import React from 'react';

class AddNewNoteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.handleChangeText = this.handleChangeText.bind(this);
    }

    /**
     * On component mount, reset the input text.
     */
    componentWillMount() {
        this.setState(() => ({
            text: ''
        }));
    }

    /**
     * Handles input changes in the text field.
     * 
     * @param {Event} e 
     */
    handleChangeText(e) {
        const text = e.target.value;
        this.setState(() => ({
            text
        }));
    }

    /**
     * Renders the AddNewNoteModal component.
     */
    render() {
        return (
            <div className="modal fade" id="modal-add-new-note" tabIndex="-1" role="dialog" aria-labelledby="modal-add-new-note" aria-hidden="true">
                <div className="modal-dialog cascading-modal modal-avatar modal-sm" role="document">
                    <div className="modal-content">                    
                        <div className="modal-body text-left mb-1"> 
                            <h3>Add New Note</h3>                        
                            <div className="md-form">
                                <input 
                                    type="text" 
                                    id="input-new-note" 
                                    className="form-control" 
                                    placeholder="Enter note title..."
                                    onChange={ this.handleChangeText }
                                    value={ this.state.text }
                                    />
                            </div>
                            <div className="text-center mt-4">
                                <button 
                                    id="btn-create-new-note" 
                                    className="btn"
                                    onClick={() => {
                                        this.props.handleAddNewNote(this.state.text);
                                    }}
                                    style={{
                                        background: this.props.color
                                    }}>
                                    Create New Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNewNoteModal;
