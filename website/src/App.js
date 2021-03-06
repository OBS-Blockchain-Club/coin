import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Button, HStack, Input, Spinner, Stack, VStack } from '@chakra-ui/react';
const ethers = require('ethers');

function App() {
 
  
  // global variables are accessible anywhere throughout the program
  // Global variables that we want are:
  // - my ethereum account
  // - coin smart contract (program)

  // 31rst March - better UI from Chakra UI

  const [account, setAccount] = useState(''); // creates an empty string that can be changed, and is accessible throughout the program

  const coin = '0x8c28aC98a5Af084c85354FcC86967e1b948385A9' // PUT IN YOUR OWN COIN CONTRACT HERE

  // name
  const [name, setName] = useState('');

  // symbol
  const [symbol, setSymbol] = useState('');

  // your balance
  const [balance, setBalance] = useState();

  // recipient address
  const [recipient, setRecipient] = useState('');

  // amount to send
  const [amount, setAmount] = useState(100);

  // ability to transfer and create new coins


  // connect your metamask account when you click on the metamask button
  const metamask = async () => {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    setAccount(accounts[0])
  }

  const connect = async () => {

	const provider = new ethers.providers.Web3Provider(window.ethereum)

	const signer = provider.getSigner()

	const coinContract = new ethers.Contract(coin, ABI, signer)

	console.log(coinContract)

	setName(await coinContract.name())

	setSymbol(await coinContract.symbol())

	console.log(await coinContract.balances(account))

	setBalance((await coinContract.balances(account)).toNumber())

  }

  connect() // setting account variable to whatever was returned (given to us) in the connect function

  const transfer = async () => {

	const provider = new ethers.providers.Web3Provider(window.ethereum)

	const signer = provider.getSigner()

	const coinContract = new ethers.Contract(coin, ABI, signer)

	const result = await coinContract.transfer(recipient, amount)

  }

  return (
    <div className="App">
      <header className="App-header">
		{
			balance == null ?
				<>
					<Button 
						colorScheme={'blue'}
						onClick={metamask}
						m={'5'}
					>
						Connect {" "} 
						<img src='/metamask.svg'/>
					</Button>
					<Spinner size='xl'/>
				</>
			: 
				<div>
					<VStack>
						<p>
						{account.substring(0, 6)}...{account.substring(account.length - 4)}
						</p>
						<HStack>
							<p>Name: {name}</p>
							<p>Symbol: {symbol}</p>
						</HStack>
						<p>Your Balance: {balance} {symbol}</p>

						<HStack>
							<Input 
								placeholder={"Enter the receiver's address"} 
								onChange={(e) => {setRecipient(e.target.value)}} 
								/>
							<Button colorScheme='blue' onClick={transfer}>Transfer</Button>
						</HStack>
					</VStack>

				</div>
		}
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
