import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import NotefulContext from './NotefulContext';

// Using class component here for practice
class FolderViewSideBar extends React.Component {
    static contextType = NotefulContext;

    render () {
        console.log(this)
        const folders = this.context.STORE.folders.map(folder => 
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
};

export default withRouter(FolderViewSideBar);