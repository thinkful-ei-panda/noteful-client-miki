import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import AddFolderView from './AddFolderView';
import AddNoteView from './AddNoteView';
import MainViewSideBar from './MainViewSideBar';
import FolderViewSideBar from './FolderViewSideBar';
import NoteViewSideBar from './NoteViewSideBar';
import MainViewMain from './MainViewMain';
import FolderViewMain from './FolderViewMain';
import NoteViewMain from './NoteViewMain';
import NotefulContext from './NotefulContext';
import STORE from './dummy-store';
import './App.css';

class App extends React.Component {
  state = {

    STORE

    // STORE: {
    //   folders: [],
    //   notes: []
    // }

  }

  addFolder = (newFolder) => {
    this.state.STORE.folders.push(newFolder)
    const newFolders = this.state.STORE.folders
    this.setState({STORE: {folders: newFolders, notes: [...STORE.notes]}})
  }

  addNote = (newNote) => {
    this.state.STORE.notes.push(newNote)
    const newNotes = this.state.STORE.notes
    this.setState({STORE: {folders: [...STORE.folders], notes: newNotes}})
  }

  deleteNote = (noteId) => {
    const newNotes = this.state.STORE.notes.filter(note => note.id !== noteId);
    this.setState({STORE: {folders: [...STORE.folders], notes: newNotes}});
  }

  componentDidMount = () => {
    fetch('http://localhost:9090/db')
      .then(response => response.json())
      .then(response => this.setState({STORE: response}))
  }

  render() {
    const contextValue = {
      STORE: this.state.STORE,
      addFolder: this.addFolder,
      addNote: this.addNote,
      deleteNote: this.deleteNote
    }

    return (
      <>
        <Header />
        <main className="wrapper">
          <div className="group-row">
            
            <NotefulContext.Provider
              value={contextValue}
              >

              {/* Add Form Route */}
              <Route exact path='/addFolderView' component={MainViewSideBar} />
              <Route exact path='/addFolderView' component={AddFolderView} />

              {/* Add Note Route */}
              <Route exact path='/addNoteView' component={MainViewSideBar} />
              <Route exact path='/addNoteView' component={AddNoteView} />


              {/* Sidebars */}
              {/* Main Route */}
              <Route exact path='/' component={MainViewSideBar} />

              {/* Dynamic Folder Route */}
              <Route exact path='/folder/:folderId' component={FolderViewSideBar} />

              {/* Dynamic Note Route */}
              <Route exact path='/note/:noteId' component={NoteViewSideBar} />



              {/* Main Sections */}
              {/* Main Route */}
              <Route exact path='/' component={MainViewMain} />
                
              {/* Dynamic Folder Route */}
              <Route exact path='/folder/:folderId' component={FolderViewMain} />

              {/* Dynamic Note Route */}
              <Route exact path='/note/:noteId' component={NoteViewMain} />



            </NotefulContext.Provider>



          </div>
        </main>
      </>
    )
  }
}

export default App;