import React, { Component } from "react";
import DrawChart from './utils/drawChart';
import {getSubpage} from './../services/subpageService';

class Statistics extends DrawChart {
  async componentDidMount() {
    await this.getStatistics();
    console.log(this.state.statisticsDataLabel,this.state.statisticsDataValue);
    this.updateCanvas()
  }

  async getStatistics(){
     await getSubpage('statistics').then(({data})=>{

        const statisticsDataValue = data.map((item,index)=>{
          return item.viewCounter;
        })

        console.log("statisticData",data)
        const statisticsDataLabel = data.map((item,index)=>{
          return item.date;
        });
        this.setState({statisticsDataLabel,statisticsDataValue});
      })
  }


  render() {
    return (
      <div>
        <h1>Statistic</h1>
        <canvas ref="canvas" width={"60"} height={"20"}/>
      </div>
    );
  }
}

export default Statistics;