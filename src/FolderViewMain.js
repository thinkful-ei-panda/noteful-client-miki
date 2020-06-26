import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import NotefulContext from './NotefulContext';

function FolderViewMain(props) {
    const deleteNoteRequest = (noteId, deleteFunction) => {
        console.log(noteId, 'ruff')
        fetch(`http://localhost:9090/notes/${noteId}`, {'method': 'DELETE'})
            .then(response => response.json())
            .then(response => deleteFunction(noteId))
            .then(props.history.push('/'))
    }

    return (
        <NotefulContext.Consumer>
            {value => {
                const notes = value.STORE.notes.filter(note => note.folderId === props.match.params.folderId).map(note =>
                    (
                        <section className="border group-column note-margin note-padding width" key={note.id}>
                            <h2><Link to={`/note/${note.id}`}>Name: {note.name}</Link></h2>
                            <div className="group-row note-group-row">
                                <p>Modified: {note.modified}</p>
                                <button onClick={() => deleteNoteRequest(note.id, value.deleteNote)}>Delete Note</button>
                            </div>
                        </section>
                    )
                );
            
                return (
                    <section className="border group-column item-double"> 
                       {notes}
                    </section>
                );
            }}
        </NotefulContext.Consumer>
    )
};

FolderViewMain.propTypes = {
    props: propTypes.object
}

export default withRouter(FolderViewMain);