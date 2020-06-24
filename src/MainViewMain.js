import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import NotefulContext from './NotefulContext';

function MainViewMain(props) {
    const deleteNoteRequest = (noteId, deleteFunction) => {
        console.log('hi', noteId)
        fetch(`http://localhost:9090/notes/${noteId}`, {'method': 'DELETE'})
            .then(response => response.json())
            .then(response => deleteFunction(noteId))
            .then(props.history.push('/'))
    }

    return (
        <NotefulContext.Consumer>
            {value => {
                const notes = value.STORE.notes.map(note => {
                    console.log('ruff', note.id)
                    return (
                        <section className="border group-column note-margin note-padding width" key={note.id}>
                            <h2><Link to={`/note/${note.id}`}>Name: {note.name}</Link></h2>
                            <div className="group-row note-group-row">
                                <p>Modified: {note.modified}</p>
                                <button onClick={() => deleteNoteRequest(note.id, value.deleteNote)}>Delete Note</button>
                            </div>
                        </section>
                    )
                })
            
                return (
                    <section className="border group-column item-double"> 
                       {notes}
                    </section>
                );
            }}
        </NotefulContext.Consumer>
    )
};

export default withRouter(MainViewMain);