import React from 'react';
import logo from '../assets/FibSTOCK_S.png';
import FakeNews from './FakeNews';
import '../styles/Dashboard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getNewsForCompany } from "../api/fibstockAPI";

export default class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: this.props.match.params.name,
            news: []
        }
    }

    componentDidMount() {
        getNewsForCompany(this.state.text).then(res => {
            res.json().then(json => {
                console.log(json);
                this.setState({news: json});
            })
        })
    }

    render(){
        
        return (
            <div>
            <div className="ToolBar"><Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link></div>
            <div className="NewsContainer">
                <FakeNews news={this.state.news}/>
            </div>
            <div className="ChartContainer"></div>
            </div>
        );
    }

}

