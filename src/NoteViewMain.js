import React from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NotefulContext from './NotefulContext';

function NoteViewMain(props) {
    const deleteNoteRequest = (noteId, deleteNoteFromUI) => {
        fetch(`http://localhost:9090/notes/${noteId}`, {'method': 'DELETE'})
            .then(response => response.json())
            .then(response => deleteNoteFromUI(noteId))
            .then(props.history.push('/'))
    }

    return (
        <NotefulContext.Consumer>
            {value => {
                console.log(value)
                const currentNote = value.STORE.notes.find(note => note.id === props.match.params.noteId)
                return (
                    <section className="border group-column item-double">
                        <section>
                            <div className="border group-column note-margin width">
                                <h2>{currentNote.name}</h2>
                                <div className="group-row note-group-row">
                                    <p>Date modified on: {currentNote.modified}</p>
                                    <button onClick={() => deleteNoteRequest(currentNote.id, value.deleteNoteFromUI)}>Delete Note</button>
                                </div>
                            </div>
                            <p className="note-margin width">{currentNote.content}</p>
                        </section>
                    </section>
                )
            }}
        </NotefulContext.Consumer>
    )
};

NoteViewMain.propTypes = {
    history: propTypes.object,
    match: propTypes.object
};

export default withRouter(NoteViewMain);