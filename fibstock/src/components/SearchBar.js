import React from 'react';
import '../styles/SearchBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class SearchBar extends React.Component {
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

    onTextChanged = (e) => {
        const value = e.target.value;
        const { items } = this.state;

        fetch("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + value +"&apikey=T2BNSYRDVEE0BHYF")
        .then(
          (result) => {
            console.log()
            this.setState({
              isLoaded: true,
              items: result.symbol
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
        console.log(items)


        let suggestions = [];
        if (value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = items.sort().filter(v => regex.test(v));
        } 
        this.setState(() => ({suggestions, text: value}));
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