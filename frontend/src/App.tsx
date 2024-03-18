import React from 'react';
import logo from './logo.svg';
import './App.css';
//import Home from './components/Home';
import Createuser from './components/Createuser';
import Displayuser from './components/Displayuser';
import Updateuser from './components/Updateuser';
import Deleteuser from './components/Deleteuser';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/Createuser" element={<Createuser/>}/>
    <Route path="/Displayuser" element={<Displayuser/>}/>
    <Route path="/Updateuser" element={<Updateuser/>}/>
    <Route path="/Deleteuser" element={<Deleteuser/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
