import './App.css';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const DATABASE_URL = 'https://sictup-752d5-default-rtdb.firebaseio.com/DHT11.json?auth=X8qgzJeTWtD9bW5d7RkCxHoUdMDfrhtQvOQkEbIv';



function App() {
  const [getData, setData] = useState([]);
  const [getLoading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const {data} = await axios.get(DATABASE_URL);
    setLoading(true)
    const temperatures = Object.values(data.Temperatura).reverse();
    const humidities = Object.values(data.Umidade).reverse();
    const datetimes = Object.values(data.Horario).reverse();
    const parsedData = temperatures.map((item, index) => {
      const temperaturesAndHumidites = {
        temperature: item,
        humidity: humidities[index],
        datetime: datetimes[index] || '---'
      }

      return temperaturesAndHumidites;
    })
    
    console.log(data);
    setData(parsedData);
    setLoading(false)
  }, [])

  
useEffect(() => {
  fetchData();
}, [fetchData])

  
  const columnStyle = {
      maxWidth: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
  }

  const tableColumns = [
    {
        name: 'Temperatura',
        selector: row => row.temperature,
        style: columnStyle,
    },
    {
        name: 'Umidade',
        selector: row => row.humidity,
        style: columnStyle,
    },
    {
      name: 'Horário',
      selector: row => row.datetime,
      style: columnStyle,
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: 'Dados por página',
    rangeSeparatorText: 'de',
    noRowsPerPage: true,
    
};
  

  return (
    <div className="App">
      <div className="header">
          <h1>SICTUP</h1>
      </div>
        <div className="content">
          <div className="tableContent">
            <div className="tableButtonsContent">
              <button className="refreshDataButton" onClick={fetchData}>Atualizar Dados</button>
            </div>
            <DataTable
              title="Dados coletados:"
              columns={tableColumns}
              data={getData}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              paginationPerPage={10}
              responsive
              noDataComponent="Nenhum dado ainda foi coletado."
              progressPending={getLoading}
            />
          </div>
        </div>
    </div>
  );
}

export default App;
