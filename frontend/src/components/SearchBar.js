import React from 'react';
import {debounce} from 'lodash';
import '../styles/SearchBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.items = [];
        this.timeout =  0;
        this.onChangeDebounced = debounce(this.onChangeDebounced, 2000)
        
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
        console.log(text)
      }

    renderSuggestions () {
        const { suggestions, items } = this.state;

        if (suggestions.length === 0){
            return null;
        } 
        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
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
            <div className="SearchBox">
                <input value={text} onChange={this.onTextChanged} type="text" placeholder="Type Company Name" />
                <button value="" onClick={(e) => this.props.onGetClick(text)} type="text">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                {this.renderSuggestions()}
            </div>
        )
    }
}