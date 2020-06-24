import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import NotefulContext from './NotefulContext';

function MainViewMain() {
    return (
        <NotefulContext.Consumer>
            {value => {
                const notes = value.STORE.notes.map(note => {
                    return (
                        <section className="border group-column note-margin note-padding width" key={note.id}>
                            <h2><Link to={`/note/${note.id}`}>Name: {note.name}</Link></h2>
                            <div className="group-row note-group-row">
                                <p>Modified: {note.modified}</p>
                                <button>Delete Note</button>
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