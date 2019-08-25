import React from 'react';
import SearchBar from './components/SearchBar.js';
import Dashboard from './components/Dashboard.js';
import Donut from './components/Donut.js';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sq: '',
    }
  }

  render() {
    return (
      <div className="App">
          <Router>
            <Route path="/" exact component={SearchBar} />
            <Route path="/company/:name" component={Dashboard} />
            <Route path="/donut" component={Donut} />
          </Router>
      </div>
    );
  }


  }

  export default App;