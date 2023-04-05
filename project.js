const contractAddress = "0x4231093081D4A9D064B62e9B718E64A65B2E03e0";
const abi =[
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isWinner",
				"type": "bool"
			}
		],
		"name": "GamePlayed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_option",
				"type": "uint8"
			}
		],
		"name": "playGame",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];
const provider = new ethers.providers.Web3Provider(window.ethereum, 97); //bnbchain testnet
let signer;
let contract;

//Нужно будет создать функцию
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    contract = new ethers.Contract(contractAddress, abi, signer);
  });
});

async function play(option) {
  let amountInWei = ethers.utils.parseEther((0.00001).toString());
  console.log(amountInWei);

  await contract.playGame(option, { value: amountInWei });
}

async function getGamePlayed() {
  let queryResult = await contract.queryFilter(
    "GamePlayed",
    (await provider.getBlockNumber()) - 5000,
    await provider.getBlockNumber()
  );
  let queryResultRecent = queryResult[queryResult.length - 1];

  let player = await queryResultRecent.args.player.toString();
  let result = await queryResultRecent.args.isWinner.toString();

  let resultLogs = `
    player: ${player}, 
    result: ${result == "false" ? "LOSE 😥" : "WIN 🎉"}`;
  console.log(result);

  let resultLog = document.getElementById("result");
  resultLog.innerText = resultLogs;
}
