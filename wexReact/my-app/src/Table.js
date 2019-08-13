import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import * as d3 from "d3";

const columns = [{
  dataField: 'ScrubbedUtterance',
  text: 'Utterance'
}, {
  dataField: 'Intent',
  text: 'Intent'
}, {
  dataField: 'IntentConfidence',
  text: 'Categorization Accuracy'
}];



class Table extends Component {


  constructor(props) {
    super(props);
    this.state = {
      tableData: null
    }
    this.FormatData = this.FormatData.bind(this);
  }

  FormatData(){
    var data = this.props.intent;
    data.sort(function(a, b) {
      return d3.ascending(parseFloat(a.IntentConfidence), parseFloat(b.IntentConfidence));
    });
    for(var i = 0; i < data.length; i++){
      data[i].uniqueKey = i
    }
    return data
  }


  render() {

    var table

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        console.log(row);
      }
    };

    if (this.props.intent.length === 0) {
      table = "nothing to see here";
    } else {
      var data = this.FormatData();
      table = <BootstrapTable
        keyField='uniqueKey'
        data={data}
        columns={ columns }
        rowEvents={ rowEvents } />;
    }
    return (
      <div>
        {table}
      </div>
    )

  }

}

export default Table;
