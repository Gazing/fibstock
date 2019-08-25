import React from 'react';
import {debounce} from 'lodash';
import logo from '../assets/FibSTOCK_M.png';
import Dashboard from '../components/Dashboard.js'
import '../styles/SearchBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { api } from "../api/fibstockAPI";


export default class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.items = [];
        this.timeout =  0;
        this.onChangeDebounced = debounce(this.onChangeDebounced, 300)
        
        this.state = {
            items: [],
            suggestions: [],
            text: '',
            isLoaded: false,
        }
    }

    onTextChanged = (e) => {
        const value = e.target.value;
        const { items, text } = this.state;
        this.setState(() => ({suggestions, text: value}));
        this.onChangeDebounced(e)

        let suggestions = [];
        if (value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = items.sort().filter(v => regex.test(v));
        } 
        
    }

    onChangeDebounced = (e) => {
        // Delayed logic goes here
        const { text } = this.state;
        api(text).then(res => {
            res.json().then(json => {
                this.setState({suggestions: json});
            })
        })
    }

    renderSuggestions () {
        const { suggestions, items } = this.state;

        if (suggestions.length === 0){
            return null;
        } 
        return (
            <ul>
                {suggestions.map((item, i) => <li key={i.toString()} onClick={() => this.suggestionSelected(item.name)}>{item.name}</li>)}
            </ul>
        );
    }

    suggestionSelected (value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
        this.props.history.push(`/company/${value}`)
    }

    render () {
        const { text } = this.state;

        return (
            <div className ="App-Component">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="SearchBox">
                    <input value={text} onChange={this.onTextChanged} type="text" placeholder="Type Company Name" />
                        <div className ="wrap">
                            <Link to={`/company/${text}`}>
                                <FontAwesomeIcon icon={faSearch} style={{color: "#FFF"}}/>
                            </Link>
                        </div>
                    {this.renderSuggestions()}
                </div>
            </div> 
        )
    }
}