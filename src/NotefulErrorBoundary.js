import React from 'react';

class NotefulErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        };
    };
    
    static getDerivedStateFromError(error) {
        return {hasError: true};  
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="group-column">
                    <h2>
                        Oops, something went wrong!
                    </h2>
                    <p>
                        {this.props.error.code}: {this.props.error.message}
                    </p>
                </div>
            )
        };

        return this.props.children;
    };
}

export default NotefulErrorBoundary;