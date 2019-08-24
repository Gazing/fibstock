import React from 'react';
import logo from '../assets/FibSTOCK_S.png';
import '../styles/Dashboard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.items = [];
        
        this.state = {
            items: [],
            suggestions: [],
            text: '',
            isLoaded: false,
        }
    }



    render () {
        const { text } = this.state;

        return (
            <div>
                <Link to = "/"> <img src={logo} className="App-logo" alt="logo" /></Link>
            </div> 
        )
    }
}