import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../styles/FakeNews.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { border } from '@material-ui/system';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getNewsForCompany } from "../api/fibstockAPI";


export default class FakeNews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          text: this.props.query,
          news: [],
        }
      }

      componentDidMount() {
        getNewsForCompany(this.props.query).then(res => {
            res.json().then(json => {
                console.log(json);
                this.setState({news: json});
            })
        })
    }

    convertToDate(timestamp) {
        let time = new Date(timestamp*1000);
        var year = time.getFullYear();
        var month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth()+1) : time.getMonth();
        var day = (time.getDate() < 10 ? '0' : '') + time.getDate();
        var d = year + '-' + month + '-' + day;
        return d;
    }

    render(){
        return (
            <div>
                <h3>News</h3>
                <ul>
                    {this.state.news.map((item) => 
                        <li key={item.title}>
                            <Card className="card" style={{borderLeftColor: item.isFake ? 'red' : 'green'}}>
                            <CardContent>
                            <Typography className='title'>{item.title}</Typography>
                            </CardContent>
                            <div className='fakeReal' style={ { color: item.isFake ? 'red' : 'green'} } >
                                {item.isFake ? 'Fake': 'Real'}
                            </div>
                            <CardActions  className='learnmore'>
                                <div className='publishdate'>{this.convertToDate(item.publishedAt)}</div>
                                <a href={item.link} target="_blank">
                                    <button className='btn'>
                                        <FontAwesomeIcon className='icon' icon = { faLocationArrow } />
                                    </button>
                                </a>
                            </CardActions>
                            </Card>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}
