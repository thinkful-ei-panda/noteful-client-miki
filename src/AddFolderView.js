import React from 'react';
import { withRouter } from 'react-router-dom';
import NotefulContext from './NotefulContext';

class AddFolderView extends React.Component {
    state = {
        folderName: '',
        error: null
    }

    static contextType = NotefulContext;

    validateFolderName = (name) => {  
        console.log(name.length, 'ruff')
        if (!name) {
            const error = 'Name must be at least 1 character length!!!!!'
            this.setState({error})
        } else if (name.length < 3) {
            const error = 'Name must be at least 3 character length!!!!! :)'
            this.setState({error})
        } else {
            this.setState({folderName: name, error: null});
        }
    }

    inputFolderName = (e) => {
        console.log(e.target.value)
        const folderName = e.target.value
        this.validateFolderName(folderName);
        // this.setState({folderName}, this.validateName(folderName))
    }

    addFolderRequest = (e) => {
        e.preventDefault();
        // Add post api 
        
        // Go to main page
    }

    render() {
        return (
            <div className="border group-column item-double justify-content-center">
                    <form className="align-self-center" onSubmit={(e) => this.addFolderRequest(e)}>
                        <label htmlFor='folderName'>Name:</label>
                        <input className='' id='folderName' name='folderName' onChange={(e) => this.inputFolderName(e)} type='text'></input>
                        <button type='submit'>Add Folder</button>
                        {this.state.error ? <p>{this.state.error}</p> : ''}
                    </form>
                </div>
        )
    }

}

export default withRouter(AddFolderView);