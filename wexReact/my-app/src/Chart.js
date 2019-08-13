import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import * as d3 from "d3";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  //VerticalBarSeriesCanvas,
  //VerticalGridLines,
  HorizontalGridLines,
} from 'react-vis';

function pick(obj, keys) {
    return keys.map(k => k in obj ? {[k]: obj[k]} : {})
               .reduce((res, o) => Object.assign(res, o), {});
}

class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPreppingData: false,
      sortedData: null,
      allIntent:null
    }
    this.SortIntoIntents = this.SortIntoIntents.bind(this);
    this.makeChartData = this.makeChartData.bind(this);

  }

  componentDidMount() {
    this.setState({isPreppingData: true});
    this.SortIntoIntents()
  }

  SortIntoIntents(){

    //GROUP BY INTENT
    var allIntent = d3.nest()
      .key(function(d) {
        return d.Intent
      })
      .entries(this.props.dataPoints);
    var intentData = allIntent

    //data = data.map(row => pick(row, ['Intent', 'IntentConfidence']));

    //SORT DATA
    allIntent.sort(function(a, b) {
      return d3.ascending(a.values.length, b.values.length);
    });

    //SLICE DATA
    var slice = allIntent.slice(20, 24);   //intents with the most utterances

    //FORMAT DATA
    var sortedData = this.makeChartData(slice)
    console.log(sortedData)
    this.setState({
      isPreppingData: false,
      sortedData,
      allIntent: intentData
    });
  }

  makeChartData(data){

    //need to make sure it is customizable and not hardcoded
    var chart = [
        {x: 0, y: null},
        {x: 1, y: null},
        {x: 2, y: null},
        {x: 3, y: null}
    ];

    console.log(data)
    for (var i = 0; i < data.length; i++){
      var eachIntent = data[i].values;
      var cutData = eachIntent.map(row => pick(row, ['Intent','IntentConfidence']));
      var arr = cutData.reduce((acc, value) => {
        return acc + parseFloat(value.IntentConfidence)/ 100.0;
      },0);
      chart[i].x = data[i].key
      chart[i].y = arr/eachIntent.length
    }
    return chart;
  }



  render() {
    if (!this.state.sortedData) {
      return <p>No data</p>;
    }
    if (this.state.isPreppingData) {
      return <p>Loading data</p>;
    }
    return (
      <div>
          <XYPlot height={300} width= {700} xType="ordinal">
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries
              data={this.state.sortedData}
              onValueClick={(datapoint, event)=>{
              var d = this.state.allIntent
                      .find(function(intent) {
                            return intent.key == datapoint.x;
                      })
                this.props.action(d.values)
              }}
            />
          </XYPlot>
      </div>
    )
  }
}

export default Chart;
