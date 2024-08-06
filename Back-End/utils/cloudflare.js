import { writeFile, readFile } from "node:fs/promises"
import { Buffer } from "node:buffer"
import { __dirname } from "./fs.js"
class CloudFlare {
  constructor(url){
    this.url = url
  }
  async sendFrom64encode(data){
    const file_png = await readFile(`${__dirname}/Back-End/img/4a303439354fb75f71cc054b3db6503cbdc5.png`, (err, data) =>{
      return Buffer.from(data).toString("base64")
    })

    const x = await fetch(`${file_png}`);
    console.log(await x.blob())
    // await writeFile(`${__dirname}/Back-End/img/base64.txt`, file_png, "base64")
  }
}
const claudFlare = new CloudFlare("")
claudFlare.sendFrom64encode()