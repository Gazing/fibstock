import React from 'react';
import SearchBar from './components/SearchBar.js';
import Dashboard from './components/Dashboard.js'
import logo from './assets/FibSTOCK_M.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sq: '',
      totalRating: '',
      rating: '',
    }
  }


  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" /> 
        <div className="App-Component">
          <Router>
            <Route path="/" exact component={SearchBar} />
            <Route path="/company/:name" component={Dashboard} />
          </Router>
        </div>
      </div>
    );
  }


  }

  export default App;