import React from 'react';

class SettingsModal extends React.Component {
    
    constructor(props) {
        super(props);
    }

    /**
     * Renders the SettingsModal component.
     */
    render() {
        const colorList = [
            "#F44336", "#E91E63", "#9C27B0", "#673AB7",
            "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4",
            "#009688", "#4CAF50", "#8BC34A", "#CDDC39",
            "#FFEB3B", "#FFC107", "#FF9800", "#FF5722"
        ];

        let paletteComponent = [];
        for (let i = 0; i < colorList.length; i += 4) {
            const row = (
                <tr key={i}>
                    {
                        colorList.slice(i, i + 4).map((x, j) => {
                            return (
                                <td className="color-palette-item" 
                                    style={{
                                        backgroundColor: x,
                                        cursor: "pointer"
                                    }}
                                    key={i+j}
                                    onClick={() => {
                                        this.props.handleChangeColors(x);
                                    }}>
                                    </td>
                            );
                        })
                    }
                </tr>
            );
            paletteComponent.push(row);
        }

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
                            <div className="text-left">
                                <h4>Change Accent Color</h4>

                                <table className="color-palette-container">
                                    <tbody>
                                    {
                                        paletteComponent.map((x, i) => {
                                            return x
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default SettingsModal;
