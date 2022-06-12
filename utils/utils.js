import fs from "fs"

export const ERC721 = [
  "balanceOf",
  "ownerOf",
  "safeTransferFrom",
  "safeTransferFrom",
  "transferFrom",
  "approve",
  "setApprovalForAll",
  "getApproved",
  "isApprovedForAll",
]
export const checkERC721 = (resString) => {
  try {
    const abi = JSON.parse(resString)
    let funcNames = []
    for (let func of abi) funcNames.push(func.name)
    for (let inter of ERC721) {
      if (!funcNames.includes(inter)) return false
    }
    return true
  } catch (error) {
    return false
  }
}

export const sleep = (ms) => {
  return new Promise((r) => setTimeout(r, ms))
}

export const readJson = (path) => {
  return new Promise((resolve) => {
    fs.readFile(path, (err, data) => {
      if (err) console.error(err)
      let res = JSON.parse(data)
      resolve(res)
    })
  })
}

export const formatTxt = (path, output) => {
  let res = fs.readFileSync(path, "utf8")
  let my_address = []
  res.split(/\r?\n/).forEach((add) => {
    my_address.push(add.trim())
  })
  fs.writeFile(output, JSON.stringify(my_address, null, 4), () => {
    console.log("done")
  })
}
