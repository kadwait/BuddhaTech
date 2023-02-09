import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Registration from './components/Registration';
import Subject from './components/Subject';
import Question from './components/Question';
import Admin from './components/Admin';
import User from './components/User';
import AddSubject from './components/AddSubject';
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import CreateQuestion from './components/CreateQuestion';


export default function App() {
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />}/>
        <Route exact path="/register" element={<Registration/>}/>
        <Route exact path='/subject' element={<Subject/>}/>
        <Route exact path='/question' element={<Question/>}/>
        <Route exact path='/admin' element={<Admin/>}/>
        <Route exact path='/addSubject' element={<AddSubject/>}/>
        <Route exact path='/createQuestion' element={<CreateQuestion/>}/>
        <Route exact path='/user' element={<User/>}/>
      </Routes>
    </Router>
  );
};