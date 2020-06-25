import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import NotefulContext from './NotefulContext';

// Using class component here for practice
class FolderViewSideBar extends React.Component {
    static contextType = NotefulContext;

    folders = this.context.STORE.folders.map(folder => 
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

export default withRouter(FolderViewSideBar);