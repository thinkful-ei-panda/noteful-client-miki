import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import MainViewSideBar from './MainViewSideBar';
import FolderViewSideBar from './FolderViewSideBar';
import NoteViewSideBar from './NoteViewSideBar';
import MainViewMain from './MainViewMain';
import FolderViewMain from './FolderViewMain';
import NoteViewMain from './NoteViewMain';
import NotefulContext from './NotefulContext';
// import STORE from './dummy-store';
import './App.css';

class App extends React.Component {
  state = {
    STORE: {
      folders: [],
      notes: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:9090/db')
      .then(response => response.json())
      .then(response => this.setState({STORE: response}))
      .then(console.log(this.state))
  }

  render() {
    const contextValue = {
      STORE: this.state.STORE
    }

    return (
      <>
        <Header />
        <main className="wrapper">
          <div className="group-row">
            
            <NotefulContext.Provider
              value={contextValue}
              >



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