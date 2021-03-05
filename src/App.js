import './App.css';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const [user, dispatch] = useStateValue();


  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
      <div className='App__body'>
        <Router>
          <Sidebar />

          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />  
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
          
        </Router>
                
      </div>
      )}
    <p className='App__credits'>Designed and coded by Abay Nurpeissov</p>
    </div>
  );
}

export default App;
