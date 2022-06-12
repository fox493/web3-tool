import axios from "axios"
import chalk from "chalk"
import dotenv from "dotenv"
import { config } from "../config.js"
dotenv.config(".env")

const ETHERSCAN_URL = "https://api.etherscan.io/api"
const PORT = config.local_proxy_port
const LOCAL_PROXY = PORT
  ? { protocol: "http", host: "127.0.0.1", port: PORT }
  : null
const ETHERSCAN_API = process.env.ETHERSCAN_KEY

// 根据钱包地址获取交易信息
const getTxInfoByUserAddress = async (address, startblock, endblock) => {
  const params = {
    module: "account",
    action: "txlist",
    address,
    startblock,
    endblock,
    sort: "desc",
  }
  try {
    let res = await sendAxiosRequest(params)
    if (res.status == "200") return res.data.result
  } catch (error) {
    console.error(error.message)
  }
  f
}

// 根据合约地址获取token信息(需要升级pro版)
const getTokenInfoByConractAddress = async (contractaddress) => {
  const params = {
    module: "token",
    action: "tokeninfo",
    contractaddress,
  }
  try {
    let res = await sendAxiosRequest(params)
    if (res.status == "200") return res.data.result
  } catch (error) {
    console.error(error.message)
  }
}

// 根据合约地址获取ABI
const getABIbyContractAddress = async (address) => {
  const params = {
    module: "contract",
    action: "getabi",
    address,
  }
  try {
    let res = await sendAxiosRequest(params)
    if (res.status == "200") return res.data.result
  } catch (error) {
    console.error(error.message)
  }
}

// 获取历史交易记录
const getHistory = async (address, startblock, endblock) => {
  const params = {
    module: "account",
    action: "txlist",
    address,
    startblock,
    endblock,
  }
  try {
    let res = await sendAxiosRequest(params)
    if (res.status == "200") return res.data.result
  } catch (error) {
    console.error(error.message)
  }
}

// 发送axios请求
const sendAxiosRequest = async (params) => {
  params.apikey = ETHERSCAN_API
  const config = {
    url: ETHERSCAN_URL,
    params,
  }
  if (LOCAL_PROXY) config.proxy = LOCAL_PROXY
  try {
    return await axios(config)
  } catch (error) {
    if (error.code == "ECONNREFUSED") {
      console.log(
        `Connection refused! Please check your local proxy config in ${chalk.red(
          "config.js"
        )} or your network!`
      )
      process.exit(0)
    }
  }
}

export const etherscan = {
  getTxInfoByUserAddress,
  getTokenInfoByConractAddress,
  getABIbyContractAddress,
  getHistory,
}
