import React from 'react';
import renderMarkdown from '../utils/renderMarkdown';

class LivePreview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div 
                id="preview"
                dangerouslySetInnerHTML={{
                    __html: renderMarkdown(this.props.markdownText)
                }}
            >
            </div>
        );
    }
}

export default LivePreview;
