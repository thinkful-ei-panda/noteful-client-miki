import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="border group-column">
            <h1><Link to='/'>Noteful</Link></h1>
            <p><Link to='/addNoteView'>Add Note</Link></p>
        </header>
    )
}

export default Header;