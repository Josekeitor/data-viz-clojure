import React, {Component, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import DataTable, {TableColumn} from 'react-data-table-component';
import Emoji from 'a11y-react-emoji'
import * as XLSX from 'xlsx';
import {VictoryChart, VictoryLine} from 'victory';
import {Charts} from "./Charts";
export type dataType = {
  id:string,
  scores: [number]
}


function App() {
  // @ts-ignore

  // @ts-ignore
  const processData = dataString => {

    const flags = {"AU": <Emoji symbol="🇦🇺"/>,"CA": <Emoji symbol="🇨🇦"/>, "CH": <Emoji symbol="🇨🇳"/>, "CO": <Emoji symbol="🇨🇴"/>, "JP": <Emoji symbol="🇯🇵"/>, "KR": <Emoji symbol="🇰🇷"/>, "RU": <Emoji symbol="🇷🇺"/>, "US": <Emoji symbol="🇺🇸"/>}
    const names = {"AU": "Australia","CA": "Canada", "CH": "China", "CO": "Colombia", "JP": "Japón", "KR": "Korea", "RU": "Rusia", "US": "Estados Unidos"}

    const dataStringLines = dataString.split(/\r\n|\n/);
    const rawData = dataStringLines[0].split(',')
    console.log(rawData)
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
    console.log("data lines ", dataStringLines)
    // @ts-ignore
    const processedData: [DataRow] = []
    // @ts-ignore
    const scoresList: [dataType] = []
    for (let i = 0; i < dataStringLines.length -1 ; i++) {
      let element = dataStringLines[i].split(',')
      console.log("element: ", element)
      // @ts-ignore
      let numbers = element[1].replace("(", "").replace(")", "").split(" ").map(num => (
        Number(num)))
      console.log("numbers: ", numbers)

      let scores = numbers.splice(1)
      let score = numbers
      // @ts-ignore
      processedData.push({name: names[element[0]], flag: flags[element[0]], score: score});
      // @ts-ignore
      scoresList.push({id: names[element[0]], scores: scores})
      console.log("Without score: ", scores)
      console.log("score", score)
    }
    console.log("Scores List: ", scoresList)
    setData(processedData)
    setChartData(scoresList)
  }

  // @ts-ignore
  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      // @ts-ignore
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      // @ts-ignore
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  }


  type DataRow = {
    name: string;
    flag: any;
    score: string;
  };

  const [columns, setColumns]: [TableColumn<DataRow>[], (data:any) => any]= useState([{
    name: 'Bandera',
    selector: row => row.flag
  }, {
    name: 'País',
    selector: row => row.name,
    sortable: true
  },
    {
      name: 'Resultado',
      selector: row => row.score,
      sortable: true
    }
  ]);

  const [data, setData]: [any, (data:any) => any] = useState([])
  const [chartData, setChartData]: [[dataType], (dat: [dataType]) => any] = useState([{id:"", scores: [0]}])
    return (
    <div className="App">
      <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
      />
      <DataTable columns={columns} data={data}/>
      <Charts data={chartData}/>
    </div>
  );
}

export default App;
