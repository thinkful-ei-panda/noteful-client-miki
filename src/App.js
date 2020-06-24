import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import MainViewSideBar from './MainViewSideBar';
import FolderViewSideBar from './FolderViewSideBar';
import NoteViewSideBar from './NoteViewSideBar';
import MainViewMain from './MainViewMain';
import FolderViewMain from './FolderViewMain';
import NoteViewMain from './NoteViewMain';
// import NotefulContext from './NotefulContext';
import STORE from './dummy-store';
import './App.css';

class App extends React.Component {
  state = {
    STORE
  }

  render() {
    return (
      <>
        <Header />
        <main className="wrapper">
          <div className="group-row">
            


              {/* Sidebars */}
              {/* Main Route */}
              <Route exact path='/' render={(props) => {
                return <MainViewSideBar />}  
              } />

              {/* Dynamic Folder Route */}
              <Route exact path='/folder/:folderId' render={(props) => {
                return <FolderViewSideBar />}  
              } />

              {/* Dynamic Note Route */}
              <Route exact path='/note/:noteId' render={(props) => {
                return <NoteViewSideBar {...props} store={this.state.STORE} />}  
              } />



              {/* Main Sections */}
              {/* Main Route */}
              <Route exact path='/' render={() => <MainViewMain notes={this.state.STORE.notes} />} />
                
              {/* Dynamic Folder Route */}
              <Route exact path='/folder/:folderId' render={(props) => <FolderViewMain {...props} notes={this.state.STORE.notes} />} />

              {/* Dynamic Note Route */}
              <Route exact path='/note/:noteId' render={(props) => <NoteViewMain {...props} notes={this.state.STORE.notes} />} />



            </div>
          </main>
      </>
    )
  }
}

export default App;