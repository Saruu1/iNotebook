import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Home from "./Components/Home";
import NoteState from "./Context/notes/NoteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { useState } from "react";
function App() {
  const [alert, setalert] = useState(null);
  const showAlert=(message, type)=>{
    setalert({
      msg : message,
      type:type
    })
    setTimeout(() => {
        
      setalert(null)
      
    }, 1000);
  }
  return (
    <>
    <NoteState>
      <Router>
      <Navbar showAlert={showAlert}/>
      <Alert alert={alert} />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert = {showAlert} />} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/login" element={<Login showAlert = {showAlert}/>} />
          <Route exact path="/signup" element={<Signup showAlert = {showAlert}/>} />
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
