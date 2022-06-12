import chalk from "chalk"
import inquirer from "inquirer"
import { ethers } from "ethers"
import { config } from "../config.js"
import burned_gas from "../tools/burned_gas.js"

export const welcome = async () => {
  console.log(`
  ██╗    ██╗███████╗██████╗ ██████╗     ████████╗ ██████╗  ██████╗ ██╗     
  ██║    ██║██╔════╝██╔══██╗╚════██╗    ╚══██╔══╝██╔═══██╗██╔═══██╗██║     
  ██║ █╗ ██║█████╗  ██████╔╝ █████╔╝       ██║   ██║   ██║██║   ██║██║     
  ██║███╗██║██╔══╝  ██╔══██╗ ╚═══██╗       ██║   ██║   ██║██║   ██║██║     
  ╚███╔███╔╝███████╗██████╔╝██████╔╝       ██║   ╚██████╔╝╚██████╔╝███████╗
   ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═════╝        ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝                                        
  `)
  console.log(
    chalk.yellow(
      "Welcome to Web3 tool, this is a command line tool for web3, enjoy yourself here!\nContact me if you want any new feature: "
    ) + chalk.green("xof493493@gmail.com 📮")
  )
  if (
    config.local_proxy_port < 0 ||
    !config.alchemy_key ||
    !config.etherscan_key
  ) {
    console.log(
      chalk.red(
        "Warning: Incompelete configuration! Please check the config file!"
      )
    )
  }
  console.log("👋 What can I help you?")
  let ans = await inquirer.prompt([
    {
      name: "tool",
      type: "list",
      choices: [
        "Calculate burned gas (ERC721)",
        "Decode contract hex input data",
      ],
    },
  ])
  switch (ans.tool) {
    case "Calculate burned gas (ERC721)":
      burned_gas()
      break

    default:
      break
  }
}

export const burned_gas_cli = async () => {
  console.log(
    chalk.yellow(
      `Hi, you will get your total gas burned of ERC721 transactions\n(once the 'to adress' is an ERC721 contract, it will be counted as an ERC721 transaction)`
    )
  )
  let ans = await inquirer.prompt([
    {
      type: "input",
      name: "address",
      default: false,
      validate(add) {
        if (ethers.utils.isAddress(add)) return true
        else return chalk.red("Please input valid address!")
      },
    },
    {
      type: "input",
      name: "start_block",
      default: false,
    },
    {
      type: "input",
      name: "end_block",
      default: false,
    },
  ])
  return ans
}
