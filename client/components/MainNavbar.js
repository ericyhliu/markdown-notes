import React from 'react';

class MainNavbar extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * Renders the MainNavbar component.
     */
    render() {
        return (
            <div>
                <nav className="mb-1 navbar fixed-top navbar-expand-lg navbar-dark indigo darken-3">
                    <a className="navbar-brand" href="#">Markdown Notes</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4" aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-4">
                        <ul className="navbar-nav ml-auto">
                            <li id="btn-settings" className="nav-item" onClick={this.props.handleOnClickSettings}>
                                <a className="nav-link waves-effect waves-light" href="#" data-toggle="modal" data-target="#fluidModalRightSuccessDemo">
                                    <i className="fa fa-gear"></i> Settings
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
};

export default MainNavbar;
