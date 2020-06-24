import React from 'react';
import { withRouter } from 'react-router-dom';
import NotefulContext from './NotefulContext';

function NoteViewMain(props) {
    return (
        <NotefulContext.Consumer>
            {value => {
                const currentNote = value.STORE.notes.find(note => note.id === props.match.params.noteId)

                return (
                    <section className="group-column item-double">
                        <section>
                            <div className="border group-column note-margin note-padding width">
                                <h2>{currentNote.name}</h2>
                                <div className="group-row note-group-row">
                                    <p>Date modified on: {currentNote.modified}</p>
                                    <button>Delete Note</button>
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

export default withRouter(NoteViewMain);