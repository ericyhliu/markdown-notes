import React from 'react';

class SettingsModal extends React.Component {
    
    constructor(props) {
        super(props);
    }

    /**
     * Renders the SettingsModal component.
     */
    render() {
        return (
            <div className="modal fade right" id="modal-settings" tabIndex="-1" role="dialog" aria-labelledby="modal-settings"
                aria-hidden="true" data-backdrop="false">
                <div className="modal-dialog modal-full-height modal-right modal-notify modal-primary" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="heading lead">Settings</p>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className="white-text">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="text-center">
                                <p>This is the settings fuck
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default SettingsModal;
