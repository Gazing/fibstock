import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {RadialChart} from 'react-vis';
import '../styles/Donut.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";;



class Donut extends Component {
  constructor(props){
    super(props);
    this.state = {
        data: this.props.sentimentData,
    }
  }
    donutExplain(mapper) {
      const values = [0,0,0,0]
      const keyValues = []
      var sum = 0
      for (var key in mapper) {
        sum = sum + mapper[key]
        keyValues.push(mapper[key])
      }
      for (var i = 0; i < 4; i++) { 
        values[i] = ((keyValues[i] / sum) * 100).toFixed(2);
      }
          return(
            <div>
              <div className= "domain">
                  <ul>
                      <li><h1><FontAwesomeIcon className='lightBlue' icon = { faSquare } /> Mixed: {values[0]} % </h1></li>
                      <li><h1><FontAwesomeIcon className='orange' icon = { faSquare } /> Negative: {values[1]} %</h1></li>
                      <li><h1><FontAwesomeIcon className='darkBlue' icon = { faSquare } /> Neutral: {values[2]} %</h1></li>
                      <li><h1><FontAwesomeIcon className='green' icon = { faSquare } /> Positive: {values[3]} %</h1></li>
                  </ul>
              </div>
          </div>
          );
    }
  
    render() {
      const mapper = {
        'Mixed': 0,
        'Negative': 0,
        'Neutral': 0,
        'Positive': 0
      }
      this.props.sentimentData.map((item => {
        mapper['Mixed'] = mapper['Mixed'] + item.SentimentScore.Mixed
        mapper['Negative'] = mapper['Negative'] + item.SentimentScore.Negative
        mapper['Neutral'] = mapper['Neutral'] + item.SentimentScore.Neutral
        mapper['Positive'] = mapper['Positive'] + item.SentimentScore.Positive
      }))


      const data = [ {angle: mapper['Mixed'], color:'#00656d'}, 
        {angle: mapper['Negative'], color:'#00a8a8'}, 
        {angle: mapper['Neutral'], color:'#00dfc2'},
        {angle: mapper['Positive'], color:'#73ffe7'}];
      // console.log(mapper)

    return (
      <div style={{"textAlign": "center", 'display': 'flex', 'flexDirection': 'column'}} >
      <h3>Sentimet Analysis</h3>
        <div className="Donut">
          <RadialChart
              data={data}
              // label={d=>d.label}
              innerRadius={80}
              radius={100}
              getAngle={d => d.angle}
              width={300}
              height={300}
              colorType ="literal"
              color={d => d.color}
              padAngle={0.04} />
              {this.donutExplain(mapper)}
        </div>
      </div>
      
    );
  }
}

export default Donut;
