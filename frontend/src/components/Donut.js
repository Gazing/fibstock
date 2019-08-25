import React, { Component } from 'react';
import '../styles/Donut.css';
import '../../node_modules/react-vis/dist/style.css';
import {RadialChart} from 'react-vis';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";;

const data = [ {angle: 1}, 
    {angle: 1}, 
    {angle: 1},
    {angle: 1}];

class DonutExplain extends Component {
    render() {
        return(
        <div>
            <ul>
                <li><h1><FontAwesomeIcon className='lightBlue' icon = { faSquare } />: 111111111111111111111</h1></li>
                <li><h1><FontAwesomeIcon className='orange' icon = { faSquare } />: 111111111111111111111</h1></li>
                <li><h1><FontAwesomeIcon className='green' icon = { faSquare } />: 111111111111111111111</h1></li>
                <li><h1><FontAwesomeIcon className='darkBlue' icon = { faSquare } />: 111111111111111111111</h1></li>
            </ul>
        </div>
        );
    }
}
class Donut extends Component {
    render() {

    return (
        <div>
            <div className="Donut" style={{float:'left', marginLeft:'15%'}}>
            <RadialChart
                data={data}
                innerRadius={100}
                radius={140}
                getAngle={d => d.angle}
                width={300}
                height={300}
                padAngle={0.04} />
            </div>
            <div><DonutExplain /></div>
        </div>
    );
  }
}

export default Donut;
