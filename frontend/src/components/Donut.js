import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {RadialChart} from 'react-vis';



class Donut extends Component {
  constructor(props){
    super(props);
    this.state = {
        data: this.props.sentimentData,
    }
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


      const data = [ {angle: mapper['Mixed']}, 
        {angle: mapper['Negative']}, 
        {angle: mapper['Neutral']},
        {angle: mapper['Positive']}];

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
