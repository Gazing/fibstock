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
        this.onChangeDebounced = debounce(this.onChangeDebounced, 1000)
        
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 4efc93af05f17a38f8758f1cc683ee83c81da756
                console.log(json)
                this.setState({suggestions: json});
        
            })
        })

<<<<<<< HEAD
=======
=======
                this.setState({suggestions: json});
            })
        })
>>>>>>> 24d2f8114f9e11940fd209d6a3c0464da30a52fe
>>>>>>> 4efc93af05f17a38f8758f1cc683ee83c81da756
    }

    redirect = () =>{
        this.props.history.push(`/company/:${this.state.text}`);
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