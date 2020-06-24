import React from 'react';
import { NavLink } from 'react-router-dom';

class FolderViewSideBar extends React.Component {
    folders = this.props.folders.map(folder => 
        <li key={folder.id}><NavLink to={`/folder/${folder.id}`}>{folder.name}</NavLink></li>
    )

    render () {
        return (
            <section className="border group-column item">
                <ul>
                    {this.folders}
                    <li><NavLink to='/'>Add Folder</NavLink></li>
                </ul>
            </section>
        );
    };
};

export default FolderViewSideBar;