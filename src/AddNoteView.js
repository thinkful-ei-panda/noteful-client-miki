import React from 'react';
import { withRouter } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import { mockComponent } from 'react-dom/test-utils';

class AddNoteView extends React.Component {
    state = {
        noteName: '',
        noteContent: '',
        folderID: 'b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1',
        error: null
    }

    static contextType = NotefulContext;

    validateNoteInput = (name) => {  
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

    inputNoteName = (e) => {
        const noteName = e.target.value
        this.validateNoteInput(noteName);
    }

    inputNoteContent = (e) => {
        const noteContent = e.target.value
        this.validateNoteInput(noteContent);
    }

    addNoteRequest = (e) => {
        e.preventDefault();
        const note = {
            name: this.state.noteName,
            content: this.state.noteContent,
            folderID: this.state.folderID
        }
        const jsonStringifiedNote = JSON.stringify(note);

        const settings = {
            'method' : 'POST',
            'headers' : {
                'Content-Type': 'application/json',
            },
            'body' : jsonStringifiedNote
        }
        fetch(`http://localhost:9090/notes`, settings)
            .then(response => response.json())
            .then(response => {
                console.log(response, 'just checking')
                const newNote = {
                    id : response.id,
                    name: this.state.noteName
                }
                this.context.addNote(newNote)
                this.props.history.push('/')
            })
    }

    render() {
        return (
            <div className="border group-column item-double justify-content-center">
                    <form className="align-self-center" onSubmit={(e) => this.addNoteRequest(e)}>
                        <label htmlFor='noteName'>Name:</label>
                        <input className='' id='noteName' name='noteName' onChange={(e) => this.inputNoteName(e)} type='text'></input>
                        <label htmlFor='noteContent'>Content:</label>
                        <textarea name='noteContent' onChange={(e) => this.inputNoteContent(e)} placeholder='noteContent'></textarea>
                        {/* <label htmlFor='noteFolder'>Folder:</label>
                        <select>
                            {folderOptions}
                        </select> */}
                        <button type='submit'>Add Note</button>
                        {this.state.error ? <p>{this.state.error}</p> : ''}
                    </form>
                </div>
        )
    }

}

export default withRouter(AddNoteView);