import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
const ethers = require('ethers');

function App() {


  
  // global variables are accessible anywhere throughout the program
  // Global variables that we want are:
  // - my ethereum account
  // - coin smart contract (program)

  const [account, setAccount] = useState(''); // creates an empty string that can be changed, and is accessible throughout the program



  const connect = async () => {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    setAccount(accounts[0])
  }

  connect() // setting account variable to whatever was returned (given to us) in the connect function

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        {account}
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
