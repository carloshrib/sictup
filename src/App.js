import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
const DATABASE_URL = 'https://sictup-752d5-default-rtdb.firebaseio.com/DHT11.json?auth=X8qgzJeTWtD9bW5d7RkCxHoUdMDfrhtQvOQkEbIv';



function App() {
  const [getData, setData] = useState([]);

  const fetchData = async () => {
    const {data} = await axios.get(DATABASE_URL);
    const temperatures = Object.values(data.Temperatura).reverse().slice(0, 15);
    const humidities = Object.values(data.Umidade).reverse().slice(0, 15);
    const parsedData = temperatures.map((item, index) => {
      const temperaturesAndHumidites = {
        temperature: item,
        humidity: humidities[index]
      }

      return temperaturesAndHumidites;
    })

    setData(parsedData);
  } 
  

useEffect(() => {
  fetchData();
}, [])

  return (
    <div className="App">
      <div className="header">
          <h1>SICTUP</h1>
      </div>
        <div className="content">
          <table className="dataTable">
            <thead>
              <tr>
                <th><div>Temperatura</div></th>
                <th><div>Umidade</div></th>
              </tr>
            </thead>
            <tbody>
              {getData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div>{item.temperature}</div>
                  </td>
                  <td>
                    <div>{item.humidity}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default App;
