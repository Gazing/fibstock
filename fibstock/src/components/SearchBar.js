import React from 'react';

export default class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.items = [];
        this.state = {
            suggestions: [],
            text: '',
        }
    }

    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        } 
        this.setState(() => ({suggestions, text: value}));
    }

    renderSuggestions () {
        const { suggestions } = this.state;
        this.items = this.state.data.map(item => item.name);

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
            <div>
                <input value={text} onChange={this.onTextChanged} type="text" placeholder="Type Company Name" />
            </div>
        )
    }
}