import React, { Component } from "react";
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, MarkSeries} from 'react-vis';
import { getStockWithCode, getFakeNewsForCompany } from "../api/StockAPI";


function getNearstDate(stock, date) {
    let dates = Object.keys(stock);
    dates.sort((a, b) => new Date(a) - new Date(b));

    for (let i = 0; i < dates.length; i++) {
        if (new Date(dates[i]) == date)
            return {y: stock[dates[i]], x: new Date(dates[i])};
        else if (i > 0 && new Date(dates[i]) > date)
            return {y: stock[dates[i-1]], x: new Date(dates[i-1])};
    }

    return {y: stock[dates[dates.length-1]], x: new Date(dates[dates.length-1])}
}

export class StockPlot extends Component {

    constructor() {
        super();
        this.state = {
            points: [],
            fakeNews: []
        }
    }
    
    componentDidUpdate(prevProps) {
        let maxStock = 0;
        let stock = {};
        if (!this.props.company) return;
        if (prevProps.company && prevProps.company.name === this.props.company.name) return;
        getStockWithCode(this.props.company).then(res => {
            res.json().then(json => {
                let data = json["Stock price"];
                
                let points = data.map(item => {
                    maxStock = Math.max(maxStock, item["close"]);
                    stock[new Date(item["date"]).toLocaleDateString()] = item["close"];
                    return {y: item["close"], x: new Date(item["date"])}
                });
    
                this.setState({points: points});

                let maxCount = 0;

                
                
                getFakeNewsForCompany(this.props.companyName).then(res => {
                    res.json().then(json => {
                        let newsCounter = {};
                        for (let i in json) {
                            let news = json[i];
                            let date = new Date(news["publishedAt"] * 1000).toLocaleDateString();
                            if (!newsCounter[date])
                                newsCounter[date] = 1
                            else
                                newsCounter[date] += 1
                                maxCount = Math.max(newsCounter[date], maxCount);
                        }
        
                        let mergedPoints = {};
                        Object.keys(newsCounter).forEach(key => {
                            let merged = getNearstDate(stock, new Date(key));
                            console.log(merged);
                            if (!mergedPoints[merged["x"]]) {
                                mergedPoints[merged["x"]] = merged;
                                mergedPoints[merged["x"]].size = 3;
                            }
                            else
                                mergedPoints[merged["x"]].size += 1;
                        })

                        let points = Object.keys(mergedPoints).map(key => {
                            console.log(mergedPoints[key]);
                            return {...mergedPoints[key]}
                        })
        
                        this.setState({fakeNews: points});
                    })
                })

            });


        });

        
    }

    render() {
        let { points, fakeNews } = this.state;
        console.log(fakeNews);
        return <div style={{"padding": "10px"}}>
            <XYPlot style={{"zIndex": 999}} height={450} width={1080} >
                <HorizontalGridLines/>
                
                
                <LineSeries data={points} color="#6C4DF7" curve={'curveMonotoneX'} strokeWidth={2}/>
                <MarkSeries data={fakeNews} color="#00DFC2" stroke={"#f2f6fa"} sizeRange={[5, 12]} strokeWidth={4}/>
                <XAxis title="time" tickTotal={13} tickFormat={ v => new Date(v).toLocaleDateString() }/>
                <YAxis title="price"/>
            </XYPlot>
        </div>
    }

    static GeneratePointsFromJSON(json) {
        
    }

}