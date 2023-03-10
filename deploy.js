require("dotenv").config();
const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // Essas duas linhas nos fornecem tudo que precisamos para interagir com Smart Contracts

  const provider = new ethers.JsonRpcProvider(
    process.env.JSON_RPC_PROVIDER_URL
  );
  const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  // Em ethers.js 'factory' é apenas um objeto que utilizamos para deploy dos contratos
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");

  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => {
    console.log("Deploy concluído!");
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    console.log("Ops! Algo deu errado.");
    process.exit(1);
  });
