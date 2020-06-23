import React from 'react';

function NoteViewMain(props) {
    const currentNote = props.notes.find(note => note.id === props.match.params.noteId)

    return (
        <section className="group-column">
            <section className="item">
                <div>
                    <h2>{currentNote.name}</h2>
                    <div>
                        <p>Date modified on: {currentNote.modified}</p>
                        <button>Delete Note</button>
                    </div>
                </div>
                <p>{currentNote.content}</p>
            </section>
        </section>
    )
};

export default NoteViewMain;