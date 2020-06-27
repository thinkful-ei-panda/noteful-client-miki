import React from 'react';

function ErrorView(props) {
    return (
        <div className="group-column">
            <h2>
                Oops, something went wrong!
            </h2>
            <p>
                {props.error.code}: {props.error.message}
            </p>
        </div>
    )

}

export default ErrorView;