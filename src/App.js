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
import NotefulErrorBoundary from './NotefulErrorBoundary';
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
    const newFolders = this.state.STORE.folders;
    newFolders.push(newFolder);
    this.setState({STORE: {folders: newFolders, notes: [...this.state.STORE.notes]}})
  }

  addNote = (newNote) => {
    const newNotes = this.state.STORE.notes;
    newNotes.push(newNote);
    this.setState({STORE: {folders: [...this.state.STORE.folders], notes: newNotes}})
  }

  deleteNote = (noteId) => {
    const newNotes = this.state.STORE.notes.filter(note => note.id !== noteId);
    this.setState({STORE: {folders: [...this.state.STORE.folders], notes: newNotes}});
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
              
              <NotefulErrorBoundary>
                {/* Add Form Route */}
                <Route exact path='/addFolderView' component={MainViewSideBar} />
                <Route exact path='/addFolderView' component={AddFolderView} />

                {/* Add Note Route */}
                <Route exact path='/addNoteView' component={MainViewSideBar} />
                <Route exact path='/addNoteView' component={AddNoteView} />
              </NotefulErrorBoundary>

              <NotefulErrorBoundary>
                {/* Sidebars */}
                {/* Main Route */}
                <Route exact path='/' component={MainViewSideBar} />

                {/* Dynamic Folder Route */}
                <Route exact path='/folder/:folderId' component={FolderViewSideBar} />

                {/* Dynamic Note Route */}
                <Route exact path='/note/:noteId' component={NoteViewSideBar} />
              </NotefulErrorBoundary>

              <NotefulErrorBoundary>
                {/* Main Sections */}
                {/* Main Route */}
                <Route exact path='/' component={MainViewMain} />
                  
                {/* Dynamic Folder Route */}
                <Route exact path='/folder/:folderId' component={FolderViewMain} />

                {/* Dynamic Note Route */}
                <Route exact path='/note/:noteId' component={NoteViewMain} />
              </NotefulErrorBoundary>


            </NotefulContext.Provider>



          </div>
        </main>
      </>
    )
  }
}

export default App;