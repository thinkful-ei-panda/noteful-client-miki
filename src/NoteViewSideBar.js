import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import NotefulContext from './NotefulContext';

function NoteViewSideBar(props) {
    return (
        <NotefulContext.Consumer>
            {value => {
                console.log(props)
                const currentNote = value.STORE.notes.find(note => note.id === props.match.params.noteId)

                const currentFolder = value.STORE.folders.find(folder => folder.id === currentNote.folderId)
            
                return (
                    <section className="group-column item">
                        <Link to='/'>Go Back</Link>
                        <h2>Folder: {currentFolder.name}</h2>
                    </section>
                )
            }}
        </NotefulContext.Consumer>
    )
}

NoteViewSideBar.propTypes = {
    match: propTypes.object.isRequired
}

export default withRouter(NoteViewSideBar);