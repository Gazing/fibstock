import React from 'react';
import logo from '../assets/FibSTOCK_S.png';
import FakeNews from './FakeNews';
import '../styles/Dashboard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getNewsForCompany, getSentimentAPI } from "../api/fibstockAPI";
import Donut from './Donut';

export default class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: this.props.match.params.name,
            news: [],
            sentimentData: []
        }
    }

    componentDidMount() {
        const queries = []
        getNewsForCompany(this.state.text).then(res => {
            res.json().then(json => {
                this.setState({news: json});
                getSentimentAPI(json.map((item) => item.title).join(",")).then(result => { 
                    result.json().then(data => {
                        this.setState({sentimentData: data})
                    })
                })
            })
        })
    }

    render(){
        console.log(this.state.sentimentData)
        return (
            <div>
            <div className="ToolBar"><Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link></div>
            <div className="NewsContainer">
                <FakeNews news={this.state.news}/>
            </div>
            <div className="ChartContainer">
                <Donut sentimentData={this.state.sentimentData} />
            </div>
            </div>
        );
    }

}

