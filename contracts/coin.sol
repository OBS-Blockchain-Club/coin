pragma solidity >=0.7.0 <0.9.0;

contract Coin {

    string public name;   // Ex: Dollars
    string public symbol; // Ex: USD

    // we need a place to store everyone's balances 
    // balance is just a number
    // tracking your balance by ethereum accounts

    // accountX has Y balance;
    // key --> account (address)
    // value --> balance (uint256);
    // specify which types of data you're using
    mapping(address => uint256) public balances;
    
    address owner;

    event Transfer(address sender, address receiver, uint256 amount);
    event Mint(address sender, uint256 amount);

    // first thing that is run is this
    constructor(string memory providedName, string memory providedSymbol, uint256 _noOfCoins) {
        name = providedName;
        symbol = providedSymbol;
        
        // balance of the creator account is 1000000 Coins
        // msg.sender is the account that calls a function

        balances[msg.sender] = _noOfCoins;

        owner = msg.sender;
    }

    // creating (minting) new coins
    function mint (uint256 _noOfCoins) public {

        // limit to the owner of the program only
        require(owner == msg.sender, "you are not the owner of this program");

        // update the person's balance to the number of coins they asked for
        balances[msg.sender] += _noOfCoins;

        emit Mint(msg.sender, _noOfCoins);
    }

    // transfer
    // 2 accounts involved --> sender, receiver
    // sender = msg.sender
    // receiver is a parameter
    // amount of coins to transfer

    function transfer (address receiver, uint256 amount) public {

        // make sure that sender has enough coins 

        require(balances[msg.sender] >= amount, "you do not have enough coins");

        // update sender and receiver balances 

            // adding amount to the receiver's balance
        balances[receiver] += amount; 

            // removing amount from your account
        balances[msg.sender] -= amount;

        emit Transfer(msg.sender, receiver, amount);
    }

    // address(0) is a blackhole - inaccessible

    // burning is usually done to increase the price of a coin - less coins available, scarcer 
    function burn (uint256 _noOfCoins) public {
        // limit to the owner of the program only
        require(owner == msg.sender, "you are not the owner of this program");

        // removing amount from your account
        balances[msg.sender] -= _noOfCoins;

    }

    // sending ethereum to the smart contract - form of payment
    // will give us back the ethereum's worth in our coins
    // payable allows us to send ethereum into the contract
    function buy () public payable {
        // msg.value is the amount of ethereum that you're sending while calling this function
        
        require(msg.value >= 1 ether);

        // update the person's balance
        // assuming that 1 ethereum is worth 1 coin
        // 1 ETH = 1 Coin
        balances[msg.sender] += msg.value/(10**18);

    }

}