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

const newsList = [
    {
    'title': 'Google GoogleGoogle GoogleGoogle GoogleGoogle GoogleGoogle GoogleGoogle GoogleGoogle GoogleGoogle GoogleGoogle Google',
    'link': 'https://www.google.com/',
    'publishedAt': '2019-01-01',
    'isFake': true
    },
    {
    'title': 'Facebook',
    'link': 'https://www.facebook.com/',
    'publishedAt': '2019-01-01',
    'isFake': true
    },
    {
    'title': 'Acorn',
    'link': 'https://twitter.com/',
    'publishedAt': '2019-01-01',
    'isFake': true
    },
    {
    'title': 'Google Google',
    'link': 'https://www.google.com/',
    'publishedAt': '2019-01-01',
    'isFake': false
    },
    {
    'title': 'Facebook',
    'link': 'https://www.facebook.com/',
    'publishedAt': '2019-01-01',
    'isFake': false
    },
    {
    'title': 'Acorn',
    'link': 'https://twitter.com/',
    'publishedAt': '2019-01-01',
    'isFake': false
    },
    {
    'title': 'Acorn',
    'link': 'https://twitter.com/',
    'publishedAt': '2019-01-01',
    'isFake': false
    },
    {
    'title': 'Acorn',
    'link': 'https://twitter.com/',
    'publishedAt': '2019-01-01',
    'isFake': false
    },
    {
    'title': 'Acorn',
    'link': 'https://twitter.com/',
    'publishedAt': '2019-01-01',
    'isFake': false
    },
    {
    'title': 'Acorn',
    'link': 'https://twitter.com/',
    'publishedAt': '2019-01-01',
    'isFake': false
    }
]

const news = newsList;

function displayFake(isFake){
    if (isFake){
        return 'Fake';
    }
    return 'Real';
}

export default class FakeNews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          text: '',
        }
      }


    // const classes = useStyles();
    render(){
        return (
            <div>
                <h3>News</h3>
                <ul>
                    {news.map((item) => 
                        <li key={item.title}>
                            <Card className="card" style={{borderLeftColor: item.isFake ? 'red' : 'green'}}>
                            <CardContent>
                            <Typography className='title'>{item.title}</Typography>
                            </CardContent>
                            <div className='fakeReal' style={ { color: item.isFake ? 'red' : 'green'} } >
                                {item.isFake ? 'Fake': 'Real'}
                            </div>
                            <CardActions  className='learnmore'>
                                <div className='publishdate'>{item.publishedAt}</div>
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
