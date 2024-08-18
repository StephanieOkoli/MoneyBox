// Importing the thirdweb SDK and ethers
const { ThirdwebSDK } = window.thirdweb;
const { ethers } = window;

// Initialize the SDK
const sdk = new ThirdwebSDK("ethereum"); // Using Ethereum mainnet

// ERC-20 Token Contract Address
const tokenAddress = "0x5C09BD312Cd6D9b4A1bf6c39D1219EdeDd435E4A";

// Get the elements
const surpriseBox = document.getElementById('surprise-box');
const coins = document.getElementById('coins');
const connectWalletButton = document.getElementById('connect-wallet');
const claimTokensButton = document.getElementById('claim-tokens');

// Variables for game state
let connectedWallet = null;
let tokenContract = null;

// Function to connect the wallet
connectWalletButton.addEventListener('click', async () => {
    try {
        // Request account access
        const [address] = await ethereum.request({ method: 'eth_requestAccounts' });
        connectedWallet = address;

        // Set up the token contract
        tokenContract = await sdk.getContract(tokenAddress, "token");
        
        alert("Wallet connected: " + connectedWallet);
    } catch (error) {
        console.error("Error connecting wallet:", error);
    }
});

// Function to handle surprise box click
surpriseBox.addEventListener('click', () => {
    coins.style.display = 'block'; // Show coins
    setTimeout(() => {
        coins.style.display = 'none'; // Hide coins after animation
    }, 1000); // Coin animation duration
});

// Function to claim tokens
claimTokensButton.addEventListener('click', async () => {
    if (!connectedWallet || !tokenContract) {
        alert("Please connect your wallet first.");
        return;
    }
    try {
        // Mint tokens to the connected wallet
        await tokenContract.erc20.mintTo(connectedWallet, ethers.utils.parseUnits("1", 18)); // Mint 1 token
        alert("Tokens claimed and deposited into your Coinbase wallet!");
    } catch (error) {
        console.error("Error claiming tokens:", error);
    }
});
