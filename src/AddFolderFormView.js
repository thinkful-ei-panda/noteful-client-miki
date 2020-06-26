import React from 'react';
import { withRouter } from 'react-router-dom';
import NotefulContext from './NotefulContext';

class AddFolderFormView extends React.Component {
    state = {
        folderName: '',
        error: null
    };

    static contextType = NotefulContext;

    validateFolderName = (name) => {  
        if (!name) {
            const error = 'Name must be at least 1 character long';
            this.setState({error});
        } else if (name.length < 3) {
            const error = 'Name must be at least 3 characters long';
            this.setState({error});
        } else {
            this.setState({folderName: name, error: null});
        }
    };

    inputFolderName = (e) => {
        const folderName = e.target.value;
        this.validateFolderName(folderName);
    };

    addFolderRequest = (e) => {
        e.preventDefault();
        const addFolderData = {name: this.state.folderName};
        const jsonStringifiedFolderData = JSON.stringify(addFolderData);
        
        fetch(`http://localhost:9090/folders`, {
            'method' : 'POST',
            'headers' : {
                'Content-Type': 'application/json',
            },
            'body' : jsonStringifiedFolderData
        })
            .then(response => response.json())
            .then(response => {
                const newFolder = {
                    id : response.id,
                    name: response.name
                }
                this.context.addFolderToUI(newFolder)
                this.props.history.push('/')
            });
    };

    render() {
        return (
            <div className="border group-column item-double justify-content-center">

                <form className="align-self-center" onSubmit={(e) => this.addFolderRequest(e)}>

                    <label htmlFor='folderName'>Name:</label>

                    <input className='' id='folderName' name='folderName' onChange={(e) => this.inputFolderName(e)} type='text'></input>

                    <button type='submit'>Add Folder</button>

                    {/* Should this be its own Component? */}
                    {this.state.error ? <p>{this.state.error}</p> : ''}

                </form>

            </div>
        );
    };

};

export default withRouter(AddFolderFormView);