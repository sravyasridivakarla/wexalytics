import React, { Component } from 'react';
//import BootstrapTable from 'react-bootstrap-table-next';
import Papa from 'papaparse'
import Intents from './Intents'



class GetData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingData: false,
      data: null
    }
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.setState({ isFetchingData: true });
    var csvFilePath = require("./Pull.csv");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.updateData
    });
  }
  updateData(result) {
    const data = result.data
    console.log(data)
    this.setState({
      isFetchingData: false,
      data: data
    }) ; // or shorter ES syntax: this.setState({ data });
  }

  render() {
    if (!this.state.data) {
      return <p>No data</p>;
    }
    if (this.state.isFetchingData) {
      return <p>Loading data</p>;
    }
    return (
      <div>
        <Intents dataPoints = {this.state.data}/>
      </div>
    )
  }
}




export default GetData;
