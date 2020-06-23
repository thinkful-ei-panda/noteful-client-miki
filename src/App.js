import React from 'react';
import { Route, Link } from 'react-router-dom';
import MainViewSideBar from './MainViewSideBar';
import FolderViewSideBar from './FolderViewSideBar';
import NoteViewSideBar from './NoteViewSideBar';
import MainViewMain from './MainViewMain';
import FolderViewMain from './FolderViewMain';
import NoteViewMain from './NoteViewMain';
import STORE from './dummy-store';

class App extends React.Component {
  state = {
    STORE
  }

  render() {
    return (
      <div>
        <header>
            <h1><Link to='/'>Noteful</Link></h1>
        </header>
        <main>
          <div>

            {/* Sidebars */}
            <Route exact path='/' render={(props) => {
              return <MainViewSideBar {...props} folders={this.state.STORE.folders} handleFolderClick={this.handleFolderClick}/>}  
            }/>

            <Route exact path='/folder/:folderId' render={(props) => {
              return <FolderViewSideBar {...props} folders={this.state.STORE.folders}/>}  
            }/>

            <Route exact path='/note/:noteId' render={(props) => {
              return <NoteViewSideBar {...props} folders={this.state.STORE.folders} notes={this.state.STORE.notes}/>}  
            }/>




            {/* Main Sections */}
            <Route exact path='/' render={() => <MainViewMain notes={this.state.STORE.notes}/>} />

            <Route exact path='/folder/:folderId' render={(props) => <FolderViewMain {...props} notes={this.state.STORE.notes}/>} />

            <Route exact path='/note/:noteId' render={(props) => <NoteViewMain {...props} notes={this.state.STORE.notes}/>} />

          </div>
        </main>
      </div>
    )
  }
}

export default App;