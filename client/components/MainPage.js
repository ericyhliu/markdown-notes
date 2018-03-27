import React from 'react';
import moment from 'moment';
import { Redirect } from 'react-router';
import MainNavbar from './MainNavbar';
import MainHeader from './MainHeader';
import NoFiles from './NoFiles';
import NoSearchResults from './NoSearchResults';
import AddNewNoteModal from './AddNewNoteModal';

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: {},
            files: [],
            searchQuery: '',
            addedNewNote: false
        };
        this.handleOnClickSettings = this.handleOnClickSettings.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAddNewNote = this.handleAddNewNote.bind(this);
    }

    /**
     * Fetches the index.json settings file on mount, updates the state for
     * addedNewNote to false.
     */
    componentWillMount() {
        this.setState(() => ({
            addedNewNote: false
        }));
        this.getIndex();
    }

    /**
     * Makes request to server to fetch the index.json settings file to configure
     * the settings customizations and the file index.
     */
    getIndex() {
        fetch('/file/settings')
        .then((resultPromise) => {
            return resultPromise.json();
        })
        .then((result) => {
            this.setState(() => ({
                ...result
            }));
        });
    }

    /**
     * Handles user clicks on the settings button, triggers settings modal.
     */
    handleOnClickSettings() {
        console.log('Settings');
    }

    /**
     * Handles live search, normalizes search query by trimming whitespace, 
     * and bring it to lowercase.
     * 
     * @param {Event} e 
     */
    handleSearch(e) {
        const searchQuery = e.target.value.trim().toLowerCase();

        this.setState(() => ({
            searchQuery
        }));
    }

    /**
     * Handles 'Add New Note' button clicked by triggering modal'.
     */
    handleAddNewNote(text) {
        text = text.trim();

        if (!text) {
            return;
        }

        fetch('/file/add-new-note', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: text
            })
        })
        .then((resultPromise) => {
            return resultPromise.json();
        })
        .then((result) => {
            if (result.err) {
                return;
            }

            this.setState(() => ({
                addedNewNote: true
            }));
        });
    }

    /**
     * Renders the MainPage component.
     */
    render() {
        if (this.state.addedNewNote) {
            return <Redirect to={'/editor'} />;
        }

        let visibleCards;

        if (this.state.files.length >= 0) {
            visibleCards = this.state.files
                .filter((x) => {
                    return x.title.toLowerCase().includes(this.state.searchQuery)
                })
                .map((x) => {
                    return (
                        <div className="col-md-4" key={ x.id }>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">{ x.title }</h4>
                                    <p className="card-text">{ moment(x.dateCreated).format('MM/DD/YYYY') }</p>
                                </div>
                            </div>
                        </div>
                    );
                });
        }

        return (
            <div>
            <div>
                <MainNavbar 
                    handleOnClickSettings={ this.handleOnClickSettings }
                />

                <div className="container-fluid container-main">
                    <MainHeader
                        title={'Welcome to Markdown Notes!'}
                        subtitle={'Create, edit and organize your notes with ease.'}
                    />

                    <div id="container-menu" className="row container-menu">
                        <div className="col-md-1"></div>
                        <div className="col-md-3">
                            <button 
                                id="btn-new-note" 
                                className="btn btn-indigo" 
                                data-toggle="modal" 
                                data-target="#modal-add-new-note">
                                <i className="fa fa-plus mr-1 icon-add-new-note"></i>
                                Add New Note
                            </button>
                        </div>
                        <div className="col-md-7">
                            <div className="md-form active-pink active-pink-2 mb-3">
                                <input 
                                    id="search-bar" 
                                    className="form-control search-bar" 
                                    type="text" 
                                    placeholder="Search notes..." 
                                    aria-label="Search" 
                                    onChange={ this.handleSearch }/>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>

                    <div id="container-cards-outer" className="row container-cards">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <div id="cards-row" className="row">
                                {
                                    this.state.files.length == 0 ?
                                    (
                                        <NoFiles />
                                    ) : 
                                    (
                                        visibleCards.length == 0 ? 
                                        (
                                            <NoSearchResults />
                                        ) :
                                        (
                                            visibleCards
                                        )
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>

            <AddNewNoteModal
                handleAddNewNote={this.handleAddNewNote}
            />

            



            <div className="modal fade" id="modal-add-new-note" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog cascading-modal modal-avatar modal-sm" role="document">
                    <div className="modal-content">                    
                        <div className="modal-body text-left mb-1"> 
                            <h3>Add New Note</h3>                        
                            <div className="md-form">
                                <input type="text" id="input-new-note" className="form-control" placeholder="Enter note title..."/>
                            </div>
                            <div className="text-center mt-4">
                                <button id="btn-create-new-note" className="btn btn-indigo">Create New Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="modal fade right" id="fluidModalRightSuccessDemo" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true" data-backdrop="false">
                <div className="modal-dialog modal-full-height modal-right modal-notify modal-info" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="heading lead">Settings</p>

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className="white-text">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="text-center">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit iusto nulla aperiam blanditiis
                                    ad consequatur in dolores culpa, dignissimos, eius non possimus fugiat. Esse ratione fuga,
                                    enim, ab officiis totam.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="modal fade right" id="fluidModalRightSuccessDemo" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true" data-backdrop="false">
                <div className="modal-dialog modal-full-height modal-right modal-notify modal-success" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="heading lead">Modal Success</p>

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className="white-text">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="text-center">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit iusto nulla aperiam blanditiis
                                    ad consequatur in dolores culpa, dignissimos, eius non possimus fugiat. Esse ratione fuga,
                                    enim, ab officiis totam.
                                </p>
                            </div>
                        </div>

                        <div className="modal-footer justify-content-center">
                            <a type="button" className="btn btn-outline-success waves-effect" data-dismiss="modal">Close</a>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        );
    }
};

export default MainPage;
