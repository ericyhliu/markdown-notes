import React from 'react';

class EditorNavbar extends React.Component {
    constructor(props) {
        super(props);
        // state: autosave time
    }

    render() {
        return (
            <nav className="mb-1 navbar fixed-top navbar-expand-lg navbar-dark indigo darken-3">
                <div className="collapse navbar-collapse" id="navbarSupportedContent-3">
                    <ul className="navbar-nav mr-auto">
                        <li id="editor-bold" className="nav-item info-item">
                            <a className="nav-link waves-effect waves-light">
                                <i className="fa fa-bold"></i>
                            </a>
                        </li>
                        <li id="editor-italic" className="nav-item info-item">
                            <a className="nav-link waves-effect waves-light">
                                <i className="fa fa-italic"></i>
                            </a>
                        </li>
                        <li id="editor-strikethrough" className="nav-item info-item">
                            <a className="nav-link waves-effect waves-light">
                                <i className="fa fa-strikethrough"></i>
                            </a>
                        </li>
                        <li id="editor-list-ul" className="nav-item info-item">
                            <a className="nav-link waves-effect waves-light">
                                <i className="fa fa-list-ul"></i>
                            </a>
                        </li>
                        <li id="editor-list-ol" className="nav-item info-item">
                            <a className="nav-link waves-effect waves-light">
                                <i className="fa fa-list-ol"></i>
                            </a>
                        </li>
                        <li id="editor-align-center" className="nav-item info-item">
                            <a className="nav-link waves-effect waves-light">
                                <i className="fa fa-align-center"></i>
                            </a>
                        </li>
                        <li id="editor-quote" className="nav-item info-item">
                            <a className="nav-link waves-effect waves-light">
                                <i className="fa fa-quote-right"></i>
                            </a>
                        </li>
                        <li id="editor-code" className="nav-item info-item">
                            <a className="nav-link waves-effect waves-light">
                                <i className="fa fa-code"></i>
                            </a>
                        </li>
                        <li id="editor-link" className="nav-item info-item">
                            <a className="nav-link waves-effect waves-light">
                                <i className="fa fa-link"></i>
                            </a>
                        </li>
                        <li id="editor-latex" className="nav-item info-item">
                            <a className="nav-link waves-effect waves-light">
                                <i className="fa fa-superscript"></i>
                            </a>
                        </li>
                    </ul>
        
                    <ul className="navbar-nav ml-auto nav-flex-icons">
                        <li className="nav-item">
                            <span className="navbar-text white-text autosave-info">
                                Last autosave: <span id="autosave-datetime">00 00 00 </span>
                            </span>
                        </li>
                        <li id="btn-done" className="nav-item">
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
