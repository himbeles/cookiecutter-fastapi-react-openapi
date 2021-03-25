import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Configuration, DefaultApi, Item} from './api'

const config = new Configuration({ basePath: 'http://localhost:8000' }); // TODO: This is for dev
export const apiClient = new DefaultApi(config);

function App() {

  const [item, setItem] = useState<Item>();


  useEffect(() => {
    apiClient.readItem(1,"my test item from api").then((response) => {
      setItem(response.data);
      console.log(response.data)
    })
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Item #{item?.id}: {item?.description ?? "no item available"}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
