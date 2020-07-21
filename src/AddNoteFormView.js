import React from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import NotefulContext from './NotefulContext';
import config from './config';

class AddNoteFormView extends React.Component {
    state = {
        newNoteName: '',
        newNoteContent: '',
        folderId: '1',
        error: {
            message: null
        },
    };

    static contextType = NotefulContext;

    // Validation Handlers

    validateNoteName = (newNoteName) => {  
        if (!newNoteName) {
            let error = {message: 'Name must have at least 1 character'}
            this.setState({error})
        } else {
            this.setState({newNoteName, error: null});
        }
    };

    // validateNoteContent = (newNoteContent) => {  
    //     if (!newNoteContent) {
    //         let error = {message: 'Content must have at least 1 character'}
    //         this.setState({error})
    //     } else {
    //         this.setState({newNoteContent, error: null});
    //     }
    // };

    // Event Handlers

    inputNoteName = (e) => {
        const newNoteName = e.target.value;
        this.validateNoteName(newNoteName);
    };

    inputNoteContent = (e) => {
        const newNoteContent = e.target.value;
        // this.validateNoteContent(newNoteContent);
        this.setState({newNoteContent});
    };

    inputNoteFolderId = (e) => {
        const folderId = e.target.value;
        this.setState({folderId});
    };

    // Network Request

    addNoteRequest = (e) => {
        e.preventDefault();

        const dateNoteModified = new Date().toDateString();

        const newNote = {
            note_name: this.state.newNoteName,
            note_content: this.state.newNoteContent,
            folder_name: this.state.folderId,
            modified: dateNoteModified
        };

        const jsonStringifiedNote = JSON.stringify(newNote);

        const settings = {
            'method' : 'POST',
            'headers' : {
                'Authorization': `Bearer ${config.API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            'body' : jsonStringifiedNote
        };

        let error;
        fetch(`${config.API_ENDPOINT}/api/notes`, settings)
            .then(response => {
                if (!response.ok) {
                    error.code = response.code;
                }              
                return response.json()
            })
            .then(response => {
                console.log(response[0]);

                if (error) {
                    error.message = response.message;
                    return Promise.reject(error);
                }
                const newNote = {
                    id : response[0].id,
                    name: response[0].name,
                    content: response[0].content,
                    folderId: response[0].folderId,
                    modified: response[0].modified
                }                
                this.context.addNoteToUI(newNote)
                this.props.history.push(`/note/${newNote.id}`)
            })
            .catch(error => this.setState({error}))
    };

    render() {
        const folderOptions = this.context.STORE.folders.map(folder => 
            // Can't seem to remember why the hell I did this
            // I suck
            folder.folder_name ? <option key={folder.id} value={folder.id}>{folder.folder_name}</option> : ''
        );
        return (
            <div className="border group-column item-double justify-content-center">

                 <form className="align-self-center group-column" onSubmit={(e) => this.addNoteRequest(e)}>

                    <label htmlFor='newNoteName'>Name:</label>
                    <input className='' id='newNoteName' name='newNoteName' onChange={(e) => this.inputNoteName(e)} placeholder='Name' type='text' required></input>

                    <label htmlFor='newNoteContent'>Content:</label>
                    <textarea name='newNoteContent' onChange={(e) => this.inputNoteContent(e)} placeholder='Content' required></textarea>

                    <label htmlFor='newNoteFolder'>Folder:</label>
                    <select id='newNoteFolder' onChange={(e) => this.inputNoteFolderId(e)}>
                        {folderOptions}
                    </select>

                    <button type='submit'>Add Note</button>
                    
                    {this.state.error ? <p>{this.state.error.message}</p> : ''}
                </form>

            </div>
        );
    };
};

AddNoteFormView.propTypes = {
    history: propTypes.object
}

export default withRouter(AddNoteFormView);