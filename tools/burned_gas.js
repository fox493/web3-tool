import chalk from "chalk"
import dotenv from "dotenv"
import { ethers } from "ethers"
import bar_color from "ansi-colors"
import cliProgress from "cli-progress"
import { checkERC721 } from "../utils/utils.js"
import { burned_gas_cli } from "../utils/cli.js"
import { etherscan } from "../utils/etherscan.js"
dotenv.config()
const main = async () => {
  let { address, start_block, end_block } = await burned_gas_cli()
  const bar = new cliProgress.SingleBar({
    format:'Scanning Progress ' + bar_color.green('{bar}') + ' {percentage}% || {value}/{total} transactions',
  }, cliProgress.Presets.shades_classic)
  try {
    let his_list = await etherscan.getHistory(address, start_block, end_block)
    let total_gas_fee_used = 0
    let index = 0
    console.log(
      `Scanning the transactions 🔍... start block: ${chalk.green(
        start_block
      )}, end block: ${chalk.green(end_block)}`
    )
    bar.start(his_list.length)
    for (let tx of his_list) {
      bar.update(++index)
      let abi = await etherscan.getABIbyContractAddress(tx.to)
      if (checkERC721(abi)) {
        total_gas_fee_used += ethers.utils.formatEther(tx.gasPrice) * tx.gas
      }
    }
    bar.stop()
    console.log(`💰total consumption: ${chalk.green(total_gas_fee_used)} Ξ`)
  } catch (error) {
    console.error(error)
  }
}

export default main