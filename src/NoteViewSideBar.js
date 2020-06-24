import React from 'react';
import { Link } from 'react-router-dom';

function NoteViewSideBar(props) {
    const currentNote = props.store.notes.find(note => note.id === props.match.params.noteId)
    const currentFolder = props.store.folders.find(folder => folder.id === currentNote.folderId)

    return (
        <section className="group-column item">
            <Link to='/'>Go Back</Link>
            <h2>Folder: {currentFolder.name}</h2>
        </section>
    )
}
export default NoteViewSideBar;