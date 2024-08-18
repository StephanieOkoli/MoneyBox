const { ThirdwebSDK } = window.thirdweb;
const { ethers } = window;

const sdk = new ThirdwebSDK("ethereum");

const tokenAddress = "0x5C09BD312Cd6D9b4A1bf6c39D1219EdeDd435E4A";

const surpriseBox = document.getElementById('surprise-box');
const coins = document.getElementById('coins');
const connectWalletButton = document.getElementById('connect-wallet');
const claimTokensButton = document.getElementById('claim-tokens');

let connectedWallet = null;
let tokenContract = null;

connectWalletButton.addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Prompt the user to open their wallet if it's not already open
            if (window.ethereum.selectedAddress) {
                // Wallet is already connected
                connectedWallet = window.ethereum.selectedAddress;
                tokenContract = await sdk.getContract(tokenAddress, "token");
                alert("Wallet already connected: " + connectedWallet);
                return;
            }

            // Request account access
            const [address] = await ethereum.request({ method: 'eth_requestAccounts' });
            connectedWallet = address;
            tokenContract = await sdk.getContract(tokenAddress, "token");
            alert("Wallet connected: " + connectedWallet);
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("Failed to connect wallet. Please make sure you have Coinbase Wallet installed and try again.");
        }
    } else {
        alert("Please install a web3 wallet like MetaMask or Coinbase Wallet to continue.");
    }
});

surpriseBox.addEventListener('click', () => {
    coins.style.display = 'block';
    setTimeout(() => {
        coins.style.display = 'none';
    }, 1000);
});

claimTokensButton.addEventListener('click', async () => {
    if (!connectedWallet || !tokenContract) {
        alert("Please connect your wallet first.");
        return;
    }
    try {
        await tokenContract.erc20.mintTo(connectedWallet, ethers.utils.parseUnits("1", 18));
        alert("Tokens claimed and deposited into your Coinbase wallet!");
    } catch (error) {
        console.error("Error claiming tokens:", error);
    }
});
