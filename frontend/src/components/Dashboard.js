import React from 'react';
import logo from '../assets/FibSTOCK_S.png';
import '../styles/Dashboard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Dashboard extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            text: '',
        }
    }


render(){

    return (
        <div>
        <div className="ToolBar"><img src={logo} className="App-logo" alt="logo" /></div>
        <div className="NewsContainer"></div>
        <div className="ChartContainer"></div>
        </div>
      );
}

}

