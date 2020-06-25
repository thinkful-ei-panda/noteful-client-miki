import React from 'react';
import { withRouter } from 'react-router-dom';
import NotefulContext from './NotefulContext';

class AddNoteView extends React.Component {
    state = {
        noteName: '',
        noteContent: '',
        folderId: '', // default for now
        error: null
    }

    static contextType = NotefulContext;

    validateNoteName = (name) => {  
        if (!name) {
            const error = 'Name must be at least 1 character length!!!!!'
            this.setState({error})
        } else if (name.length < 3) {
            const error = 'Name must be at least 3 character length!!!!! :)'
            this.setState({error})
        } else {
            this.setState({noteName: name, error: null});
        }
    }

    validateNoteContent = (content) => {  
        if (!content) {
            const error = 'Name must be at least 1 character length!!!!!'
            this.setState({error})
        } else if (content.length < 3) {
            const error = 'Name must be at least 3 character length!!!!! :)'
            this.setState({error})
        } else {
            this.setState({noteContent: content, error: null});
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
        this.setState({folderId})
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


        // Promise.all([
        //     fetch(`http://localhost:9090/folders`),
        //     fetch(`http://localhost:9090/notes`, settings)
        // ])
        //     .then(response => response.json())
        //     .then(response => console.log(response))

        fetch(`http://localhost:9090/notes`, settings)
            .then(response => response.json())
            .then(response => {
                console.log(response, 'just checking')
                const newNote = {
                    id : response.id,
                    name: response.name,
                    content: response.content,
                    folderid: response.folderId
                }
                console.log(newNote);
                this.context.addNote(newNote)
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
                        <input className='' id='noteName' name='noteName' onChange={(e) => this.inputNoteName(e)} type='text'></input>
                        <label htmlFor='noteContent'>Content:</label>
                        <textarea name='noteContent' onChange={(e) => this.inputNoteContent(e)} placeholder='noteContent'></textarea>
                        <label htmlFor='noteFolder'>Folder:</label>
                        <select onChange={(e) => this.inputNoteFolderId(e)}>
                            {folderOptions}
                        </select>
                        <button type='submit'>Add Note</button>
                        {this.state.error ? <p>{this.state.error}</p> : ''}
                    </form>
                </div>
        )
    }

}

export default withRouter(AddNoteView);