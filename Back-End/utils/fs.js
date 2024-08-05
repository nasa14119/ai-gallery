import crypto from "node:crypto"
import path from "node:path"
import { writeFile } from "node:fs/promises";
const __dirname = path.resolve(); 

export const safeImg = async (base64Data) => {
    let error = null; 
    const hash = crypto.randomBytes(18).toString("hex")+".png"; 
    const directory = path.join(__dirname, "/Back-End/img", hash)
    await writeFile(directory, base64Data, "base64", (error) => {
      console.log(error);
      error = "Something went wrong saving the file" 
    }); 
    return [error, hash]
}