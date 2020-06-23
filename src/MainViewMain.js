import React from 'react';
import { Link } from 'react-router-dom';

function MainViewMain(props) {
    const notes = props.notes.map(note => {
        return (
            <section key={note.id}>
                <h2><Link to={`/note/${note.id}`}>Name: {note.name}</Link></h2>
                <div>
                    <p>Modified: {note.modified}</p>
                    <button>Delete Note</button>
                </div>
            </section>
        )
    })

    return (
        <section className="group-column"> 
           {notes}
        </section>
    );
};

export default MainViewMain;