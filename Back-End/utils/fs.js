import crypto from "node:crypto";
import path from "node:path";
import { writeFile, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import { env } from "./env.js"
export const __dirname = path.resolve();

export const saveImgBase64 = async (base64Data, hash) => {
  let error = null;
  const directory = path.join(__dirname, "Back-End", env.PATH_IMG, hash + ".png");
  await writeFile(directory, base64Data, "base64", (error) => {
    console.log(error);
    error = "Something went wrong saving the file";
  });
  return [error, hash];
};

export const getHash = () => crypto.randomBytes(10).toString("hex");

export const removeCache = async (hash) => {
  let error = null;
  const directory = path.join(__dirname, "/Back-End/img", hash + ".png");
  const isCached = existsSync(directory); 
  if(!isCached) return error
  await unlink(directory, (e) => {
    console.log(e);
    error = "Somenthing went wrong deleting file";
  });
  return error;
};
export const getHashFile = (hash) => {
  return path.join(__dirname, "/Back-End/img", hash);
};
