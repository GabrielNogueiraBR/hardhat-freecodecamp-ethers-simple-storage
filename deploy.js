const ethers = required("ethers");

async function main() {
  // Essas duas linhas nos fornecem tudo que precisamos para interagir com Smart Contracts
  const provider = new ethers.providers.JsonRpcProvider("http://0.0.0.0:8545");
  const wallet = new ethers.Wallet("WALLET_PRIVATE_KEY", provider);

  

}

main()
  .then(proccess.exit(0))
  .catch((error) => {
    console.log(error);
    proccess.exit(1);
  });
