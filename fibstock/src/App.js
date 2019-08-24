import React from 'react';
import logo from './logo.svg';
import SearchBar from './components/SearchBar.js';
import Dashboard from './components/Dashboard.js'
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
        <Router>
          <Route path="/" exact component={SearchBar} />
          <Route path="/company/:name" component={Dashboard} />
        </Router>
      </div>
    );
  }


  }

  export default App;