import React from 'react';
import moment from 'moment';
import { Redirect } from 'react-router';
import FileSaver from 'file-saver';

// Components:
import MainNavbar from './MainNavbar';
import MainHeader from './MainHeader';
import NoFiles from './NoFiles';
import NoSearchResults from './NoSearchResults';
import AddNewNoteModal from './AddNewNoteModal';
import SettingsModal from './SettingsModal';
import CardSettingsModal from './CardSettingsModal';

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: {},
            files: [],
            searchQuery: '',
            addedNewNote: false,
            deletedNote: false,
            openNoteInEditor: false,
            openNoteID: '',
            cardSettingsData: {},
            loading: false
        };
        this.handleOnClickSettings = this.handleOnClickSettings.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAddNewNote = this.handleAddNewNote.bind(this);
        this.handleCardSettings = this.handleCardSettings.bind(this);
        this.handleOpenNoteInEditor = this.handleOpenNoteInEditor.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
        this.handleExportToPDF = this.handleExportToPDF.bind(this);
    }

    /**
     * Fetches the index.json settings file on mount, updates the state for
     * addedNewNote to false.
     */
    componentWillMount() {
        this.setState(() => ({
            addedNewNote: false,
            deletedNote: false,
            openNoteInEditor: false,
            openNoteID: ''
        }));
        this.getIndex();
        localStorage.clear();
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
     * Handles open card settings.
     * 
     * @param {Object} data 
     */
    handleCardSettings(data) {
        this.setState(() => ({
            cardSettingsData: data
        }));
    }

    /**
     * Opens the note in editor with the given id.
     * 
     * @param {string} id 
     */
    handleOpenNoteInEditor(id) {
        this.setState(() => ({
            openNoteInEditor: true,
            openNoteID: id
        }));
    }

    /**
     * Handle delete note.
     */
    handleDeleteNote(id) {
        if (!id) {
            return;
        }

        fetch('/file/delete-note', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: id
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
                deletedNote: true
            }));
        });
    }

    /**
     * Exports the markdown file by the given id name as a PDF, then 
     * automatically downloads the file.
     * 
     * @param {string} id 
     */
    handleExportToPDF(id) {
        if (!id) {
            return;
        }

        this.setState(() => ({
            loading: true
        }));

        fetch(`/file/export/${id}`)
        .then((result) => {
            return result.blob();
        })
        .then((result) => {
            this.setState(() => ({
                loading: false
            }));
            FileSaver.saveAs(result, 'download.pdf');
        });
    }

    /**
     * Renders the MainPage component.
     */
    render() {
        if (this.state.addedNewNote || this.state.deletedNote) {
            window.location.reload();
        }

        if (this.state.openNoteInEditor) {
            return <Redirect to={{
                pathname: '/editor',
                state: {
                    id: this.state.openNoteID
                }
            }} />;
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
                                <h4 className="card-title">
                                    <span 
                                        className="card-note-title"
                                        onClick={() => {
                                            this.handleOpenNoteInEditor(x.id);
                                        }}>
                                    { 
                                        x.title 
                                    }
                                    </span>
                                </h4>
                                <p className="card-text">{ moment(x.dateCreated).format('LL') }</p>
                                <div className="card-settings-container">
                                    <a 
                                        href="#" 
                                        className="d-flex justify-content-end float-right float-bottom" 
                                        data-toggle="modal" 
                                        data-target="#modal-card-settings"
                                        onClick={() => {
                                            this.handleCardSettings({
                                                id: x.id,
                                                title: x.title,
                                                dateCreated: x.dateCreated
                                            });
                                        }}>
                                        <span><i className="fa fa-cog card-settings"></i></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
            .reverse();
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
                    handleAddNewNote={ this.handleAddNewNote }
                />

                <SettingsModal />

                <CardSettingsModal 
                    cardSettingsData={ this.state.cardSettingsData }
                    handleOpenNoteInEditor={ this.handleOpenNoteInEditor }
                    handleDeleteNote={ this.handleDeleteNote }
                    handleExportToPDF={ this.handleExportToPDF }
                    loading={ this.state.loading }
                />
            </div>
        );
    }
};

export default MainPage;
