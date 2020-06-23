import React from 'react';
import { NavLink} from 'react-router-dom';

function MainViewSideBar(props) {
    const folders = props.folders.map(folder => 
        <li key={folder.id}><NavLink to={`/folder/${folder.id}`}>{folder.name}</NavLink></li>
    )

    return (
        <section className="group-column">
            <ul>
                {folders}
            </ul>
            <button>Add Folder</button>
        </section>
    );
};

export default MainViewSideBar;