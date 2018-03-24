import React from 'react';
import MainNavbar from './MainNavbar';
import MainHeader from './MainHeader';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClickSettings = this.handleOnClickSettings.bind(this);
    }

    handleOnClickSettings() {
        console.log('Settings');
    }

    render() {
        return (
            <div>
                <MainNavbar 
                    handleOnClickSettings={this.handleOnClickSettings}
                />

                <div className="container-fluid container-main">
                    <MainHeader
                        title={'Welcome to Markdown Notes!'}
                        subtitle={'Create, edit and organize your notes with ease.'}
                    />

                    <div id="container-menu" className="row container-menu">
                        <div className="col-md-1"></div>
                        <div className="col-md-3">
                            <button id="btn-new-note" className="btn btn-indigo" data-toggle="modal" data-target="#modal-add-new-note"><i className="fa fa-plus mr-1"></i>&nbsp;&nbsp;Add New Note</button>
                        </div>
                        <div className="col-md-7">
                            <div className="md-form active-pink active-pink-2 mb-3">
                                <input id="search-bar" className="form-control search-bar" type="text" placeholder="Search notes..." aria-label="Search" />
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>

                    <div id="container-cards-outer" className="row container-cards">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <div id="cards-row" className="row">
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">CS 241 Lecture 1</h4>
                                            <p className="card-text">Date Created: 03/24/2018</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">CS 240 Lecture 1</h4>
                                            <p className="card-text">Date Created: 03/23/2018</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">CO 250 Lecture 1</h4>
                                            <p className="card-text">Date Created: 03/23/2018</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
        );
    }
};

export default MainPage;
