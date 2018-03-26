import React from 'react';

/**
 * Renders the MainHeader stateless functional component.
 */
const MainHeader = (props) => (
    <div id="container-header" className="row container-header">
        <div className="col-md-1"></div>
        <div className="col-md-10">
            <h1 className="header-title">{ props.title }</h1>
            <p className="header-subtitle">{ props.subtitle }</p> 
        </div>
        <div className="col-md-1"></div>
    </div>
);

export default MainHeader;
