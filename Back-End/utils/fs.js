import crypto from "node:crypto"
import path from "node:path"
import { writeFile } from "node:fs/promises";
export const safeImg = async (base64Data) => {
    let success = true; 
    const __dirname = path.resolve(); 
    const hash = crypto.randomBytes(18).toString("hex")+".png"; 
    const directory = path.join(__dirname, "/Back-End/img", hash)
    await writeFile(directory, base64Data, "base64", (error) => {
      console.log(error);
      success = false;
    }); 
    if(!success) throw Error("Something went wrong while saving file")
}