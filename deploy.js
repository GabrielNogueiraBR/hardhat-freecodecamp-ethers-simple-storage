require("dotenv").config()
const ethers = require("ethers")
const fs = require("fs-extra")

async function main() {
    // Essas duas linhas nos fornecem tudo que precisamos para interagir com Smart Contracts
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider)

    const abi = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.abi",
        "utf-8"
    )
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf-8"
    )

    // Em ethers.js 'factory' é apenas um objeto que utilizamos para deploy dos contratos
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, please wait...")

    const contract = await contractFactory.deploy()
    await contract.deploymentTransaction().wait(1)

    console.log(`Contract Address: ${await contract.getAddress()}`)

    const currentFavoriteNumber = await contract.retrieve()
    console.log("Current Favorite Number: ", currentFavoriteNumber.toString())

    const transactionStoreResponse = await contract.store("7")
    await transactionStoreResponse.wait(1)

    const updateFavoriteNumber = await contract.retrieve()
    console.log("Update Favorite Number: ", updateFavoriteNumber.toString())
}

main()
    .then(() => {
        console.log("Deploy concluído!")
        process.exit(0)
    })
    .catch((error) => {
        console.log(error)
        console.log("Ops! Algo deu errado.")
        process.exit(1)
    })
