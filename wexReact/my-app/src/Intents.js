import React, { Component } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import * as d3 from "d3";
import Table from './Table';
import Chart from './Chart';
import 'bootstrap/dist/css/bootstrap.css';


class Intents extends Component{

  constructor(props) {
    super(props);
    this.state = {
      intentData:null
    }
    this.intentHandler = this.intentHandler.bind(this);
  }

  intentHandler(data) {
    this.setState({
      intentData: data
    });
  }


  render(){

    if (!this.state.intentData) {
      return (
        <div className = "Intents" >
          <div class="container">
           <div class="row">
              <div class = 'col'>
                <Chart dataPoints = {this.props.dataPoints} action={this.intentHandler}/>
              </div>
           </div>
          </div>
        </div>
      );
    }
    return(
    <div className = "Intents" >
      <div class="container">
       <div class="row">
          <div class = 'col'>
            <Chart dataPoints = {this.props.dataPoints} action={this.intentHandler}/>
          </div>
       </div>
       <div class ="row">
         <div class = 'col'>
           <Table intent = {this.state.intentData}/>
         </div>
       </div>
       <div class ="row">
         <div class = 'col'>
           <Tree/>
         </div>
       </div>
      </div>
    </div>

  );
  }
}

export default Intents;
