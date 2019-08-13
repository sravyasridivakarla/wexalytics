import React from 'react';
import './App.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import GetData from './GetData'

function pick(obj, keys) {
    return keys.map(k => k in obj ? {[k]: obj[k]} : {})
               .reduce((res, o) => Object.assign(res, o), {});
}


function App() {

  const table = [
    {
        'accounts.id': 5,
        'client.name': 'John Doe',
        'bank.code': 'MDAKW213'
    },
      {'accounts.id': 3, 'client.name': 'Steve Doe', 'bank.code': 'STV12JB'}
  ];


console.log(table)
  console.log(table.map(row => pick(row, ['client.name', 'accounts.id'])));





  return (
    <div className = "App" >
      <div className = "header-banner">
        <h1> WEXALYTICS </h1>
      </div>
    <GetData />
    </div>
  );
}
export default App;
