import React from 'react';
import { NavLink} from 'react-router-dom';

function MainViewSideBar(props) {
    const folders = props.folders.map(folder => 
        <li key={folder.id}><NavLink to={`/folder/${folder.id}`}>{folder.name}</NavLink></li>
    )

    return (
        <section className="border group-column item">
            <ul>
                {folders}
                <li><NavLink to='/'>Add Folder</NavLink></li>
            </ul>
        </section>
    );
};

export default MainViewSideBar;