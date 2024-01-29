import React, { Fragment } from 'react';
import './App.css';
import LoadingBar, { showLoading, hideLoading } from "react-redux-loading-bar";
import { Routes, Route } from 'react-router-dom'

import Nav from './features/components/Nav'
import Leaderboard from './features/components/Leaderboard';
import New from './features/components/New';
import Home from './features/components/Home';
import LoginPage from './features/components/LoginPage';
import Question from './features/components/Question'




function App() {

  return (
    <Fragment>
      
      <div className="App-header flex-column" >
      <LoadingBar className="custom_something" style={{ backgroundColor: 'red', height: '2px' }}/>
      <Nav />
      </div>
      <div className='main'>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/leaderboard" exact element={<Leaderboard />} />
          <Route path="/new" exact element={<New />} />
          <Route path="/question/:id" element={<Question />} />
        </Routes>
      </div>
      

    </Fragment>
  );
}

export default App;
