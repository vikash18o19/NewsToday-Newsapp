import './App.css';
import Navbar from './components/Navbar';
import React, { Component } from 'react'
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  
} from "react-router-dom";
export default class App extends Component {
  render() {
    let keyNo = process.env.REACT_APP_NEWS_API
    return (
      <div>
        <Router>
        <Navbar/>
          <Routes>
            <Route path="/" element={<News key = "general" pageSize={10} api={keyNo} country="in" category="general"/>}/>
            <Route path="science" element={<News key = "science" pageSize={10} api={keyNo} country="in" category="science"/>}/>
            <Route path="business" element={<News key = "business" pageSize={10} api={keyNo} country="in" category="business"/>}/>
            <Route path="health" element={<News key = "health" pageSize={10} api={keyNo} country="in" category="health"/>}/>
            <Route path="sports" element={<News key = "sports" pageSize={10} api={keyNo} country="in" category="sports"/>}/>
            <Route path="technology" element={<News key = "technology" pageSize={10} api={keyNo} country="in" category="technology"/>}/>
            <Route path="entertainment" element={<News key = "entertainment" pageSize={10} api={keyNo} country="in" category="entertainment"/>}/>
            <Route path="general" element={<News key = "general" pageSize={10} api={keyNo} country="in" category="general"/>}/>

          </Routes>
        </Router> 
       
      </div> 
    )
  }
}
