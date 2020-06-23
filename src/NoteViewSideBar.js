import React from 'react';

function NoteViewSideBar(props) {
    console.log(props)
    const currentNote = props.notes.find(note => note.id === props.match.params.noteId)
    const currentFolder = props.folders.find(folder => folder.id === currentNote.folderId)

    return (
        <section className="group-column">
            <button>Go Back</button>
            <h2>{currentFolder.name}</h2>
        </section>
    )
}
export default NoteViewSideBar;