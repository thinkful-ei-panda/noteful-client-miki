import React from 'react';
import { withRouter } from 'react-router-dom';
import NotefulContext from './NotefulContext';

class AddNoteFormView extends React.Component {
    state = {
        noteName: '',
        noteContent: '',
        folderId: 'b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1',
        error: null
    }

    static contextType = NotefulContext;

    validateNoteName = (noteName) => {  
        if (!noteName) {
            const error = 'Name must have at least 1 character'
            this.setState({error})
        } else if (noteName.length < 3) {
            const error = 'Name must have at least 3 characters'
            this.setState({error})
        } else {
            this.setState({noteName, error: null});
        }
    }

    validateNoteContent = (noteContent) => {  
        if (!noteContent) {
            const error = 'Name must have at least 1 character'
            this.setState({error})
        } else if (noteContent.length < 3) {
            const error = 'Name must have at least 3 characters'
            this.setState({error})
        } else {
            this.setState({noteContent, error: null});
        }
    }

    inputNoteName = (e) => {
        const noteName = e.target.value;
        this.validateNoteName(noteName);
    }

    inputNoteContent = (e) => {
        const noteContent = e.target.value;
        this.validateNoteContent(noteContent);
    }

    inputNoteFolderId = (e) => {
        const folderId = e.target.value;
        this.setState({folderId});
    }

    addNoteRequest = (e) => {
        e.preventDefault();
        const note = {
            name: this.state.noteName,
            content: this.state.noteContent,
            folderId: this.state.folderId
        }
        const jsonStringifiedNote = JSON.stringify(note);

        const settings = {
            'method' : 'POST',
            'headers' : {
                'Content-Type': 'application/json',
            },
            'body' : jsonStringifiedNote
        }

        let error;
        fetch(`http://localhost:9090/notes`, settings)
            .then(response => {
                if (!response.ok) {
                    error.code = response.code;
                }              
                return response.json()
            })
            .then(response => {
                if (error) {
                    error.message = response.message;
                    return Promise.reject(error);
                }
                const newNote = {
                    id : response.id,
                    name: response.name,
                    content: response.content,
                    folderId: response.folderId
                }                
                this.context.addNoteToUI(newNote)
                this.props.history.push('/')
            })
    }

    render() {
        const folderOptions = this.context.STORE.folders.map(folder => 
            folder.name ? <option key={folder.id} value={folder.id}>{folder.name}</option> : ''
        )

        return (
            <div className="border group-column item-double justify-content-center">

                 <form className="align-self-center group-column" onSubmit={(e) => this.addNoteRequest(e)}>

                    <label htmlFor='noteName'>Name:</label>
                    <input className='' id='noteName' name='noteName' onChange={(e) => this.inputNoteName(e)} placeholder='Name' type='text'></input>

                    <label htmlFor='noteContent'>Content:</label>
                    <textarea name='noteContent' onChange={(e) => this.inputNoteContent(e)} placeholder='Content'></textarea>

                    <label htmlFor='noteFolder'>Folder:</label>
                    <select onChange={(e) => this.inputNoteFolderId(e)}>
                        <option value={0}>Select Folder</option>
                        {folderOptions}
                    </select>

                    <button type='submit'>Add Note</button>
                    
                    {this.state.error ? <p>{this.state.error}</p> : ''}
                </form>

            </div>
        )
    }

}

export default withRouter(AddNoteFormView);