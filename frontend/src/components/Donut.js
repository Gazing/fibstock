import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {RadialChart} from 'react-vis';

const data = [ {angle: 1}, 
    {angle: 2}, 
    {angle: 5},
    {angle: 3}];

class Donut extends Component {
    render() {

    return (
      <div className="Donut">
        <RadialChart
            data={data}
            // label={d=>d.label}
            innerRadius={100}
            radius={140}
            getAngle={d => d.angle}
            width={300}
            height={300}
            padAngle={0.04} />
      </div>
    );
  }
}

export default Donut;
