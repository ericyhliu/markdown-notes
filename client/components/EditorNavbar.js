import React from 'react';
import moment from 'moment';

class EditorNavbar extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * Renders the EditorNavbar component.
     */
    render() {
        const menuBarID = [
            ["bold", "bold"],
            ["italic", "italic"],
            ["strikethrough", "strikethrough"],
            ["list-ul", "list-ul"],
            ["list-ol", "list-ol"],
            ["align-center", "align-center"],
            ["quote", "quote-right"],
            ["code", "code"],
            ["link", "link"],
            ["latex", "superscript"]
        ];

        console.log('navbar', this.props.color)

        return (
            <nav 
                id="editor-navbar" 
                className="mb-1 navbar fixed-top navbar-expand-xl navbar-dark"
                style={{
                    backgroundColor: this.props.color
                }}>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-3" aria-controls="navbarSupportedContent-3" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent-3">
                    <ul className="navbar-nav mr-auto">
                        {
                            menuBarID.map((x, i) => {
                                const id = x[0];
                                const iconID = x[1];

                                return (
                                    <li 
                                        id={`editor-${id}`} 
                                        className="nav-item info-item" 
                                        key={i} 
                                        onClick={() => {
                                            this.props.handleMenuBarItemClick(id);
                                        }}>
                                        <a className="nav-link waves-effect waves-light">
                                            <i className={`fa fa-${iconID}`}></i>
                                        </a>
                                    </li>
                                );
                            })
                        }
                    </ul>
        
                    <ul className="navbar-nav ml-auto nav-flex-icons">
                        <li className="nav-item">
                            <span className="navbar-text white-text autosave-info">
                                Last autosave:&nbsp;
                                <span id="autosave-datetime">
                                {
                                    moment(this.props.lastAutosaveTime).format('MM/DD/YYYY h:mm:ss a')
                                }
                                </span>
                            </span>
                        </li>
                        <li 
                            id="btn-done" 
                            className="nav-item" 
                            onClick={() => {
                                this.props.handleSaveEditor()
                            }}>
                            <a className="nav-link waves-effect waves-light">
                                Done
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default EditorNavbar;
