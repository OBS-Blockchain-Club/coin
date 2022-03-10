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

  const coin = "0x8c28aC98a5Af084c85354FcC86967e1b948385A9"

  const [name, setName] = useState('');

  const [symbol, setSymbol] = useState('');

  const [balance, setBalance] = useState();

  const connect = async () => {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    setAccount(accounts[0])

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // gives you data from the blockchain

    const signer = provider.getSigner()
    // provider + allows you to write stuff to the blockchain

    const coinContract = new ethers.Contract(coin, ABI, signer)
    
    // getting the coin's name
    setName(await coinContract.name())

    // getting the coin's symbol --> ex: for Dollars the symbol is USD
    setSymbol(await coinContract.symbol())

    // checking how many coins I have in my account
    setBalance((await coinContract.balances(account)).toNumber())
  }

  connect() // setting account variable to whatever was returned (given to us) in the connect function

  // function to create new coins
  const mint = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // gives you data from the blockchain

    const signer = provider.getSigner()
    // provider + allows you to write stuff to the blockchain

    const coinContract = new ethers.Contract(coin, ABI, signer)
    
    try {
      await coinContract.mint(100000)
    } catch(error) {
      console.log(error.message)
    }
  }

  // function to transfer coins to another person
  const transfer = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // gives you data from the blockchain

    const signer = provider.getSigner()
    // provider + allows you to write stuff to the blockchain

    const coinContract = new ethers.Contract(coin, ABI, signer)
    
    try {
      await coinContract.transfer('0x5fc7ea45013d40ecc3979f7dca53035480e52750', 200)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {account}
        </p>
        <p>Name of Coin: {name}</p>
        <p>Balance: {balance} {symbol}</p>
        <button onClick={transfer}>Transfer coins</button>
        <button onClick={mint}>Create 100000 coins</button>
      </header>
    </div>
  );
}

export default App;

const ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "providedName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "providedSymbol",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_noOfCoins",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Mint",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_noOfCoins",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_noOfCoins",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
