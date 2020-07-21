import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import NotefulContext from './NotefulContext';
import config from './config';

function MainViewMain(props) {
    const deleteNoteRequest = (noteId, deleteNoteFromUI) => {
        fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
            'method': 'DELETE',
            'headers': {
                'Authorization': `Bearer ${config.API_KEY}`,
            }
        })
            .then(response => response.json())
            .then(response => deleteNoteFromUI(noteId))
            .then(props.history.push('/'))
    }

    return (
        <NotefulContext.Consumer>
            {value => {
                const notes = value.STORE.notes.map(note => {
                    let dateNoteModifiedObj = new Date(note.modified);
                    let dateNoteModified = dateNoteModifiedObj.toDateString();
                    return (
                        <section className="border group-column note-margin note-padding width" key={note.id}>
                            <h2><Link to={`/note/${note.id}`}>Name: {note.note_name}</Link></h2>
                            <div className="group-row note-group-row">
                                <p>Date modified on: {dateNoteModified}</p>
                                <button onClick={() => deleteNoteRequest(note.id, value.deleteNoteFromUI)}>Delete Note</button>
                            </div>
                        </section>
                    );
                });
            
                return (
                    <section className="border group-column item-double"> 
                       {notes}
                    </section>
                );
            }}
        </NotefulContext.Consumer>
    );
};

MainViewMain.propTypes = {
    history: propTypes.object
};

export default withRouter(MainViewMain);