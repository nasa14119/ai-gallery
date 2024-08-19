import crypto from "node:crypto";
import path from "node:path";
import { writeFile, unlink, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

export const __dirname = path.resolve();

export const isFileCached = async (hash) => {
  const img_directory = path.join(__dirname, "Back-End", "img");
  if (!existsSync(img_directory)) {
    await mkdir(img_directory, { recursive: true });
    return false;
  }
  return existsSync(path.join(img_directory, hash + ".png"));
};

export const getHashFile = async (hash) => {
  if (await isFileCached(hash)) {
    return path.join(__dirname, "Back-End", "img", hash + ".png");
  }
  throw new Error("File not found in cache");
};

export const getHashPath = (hash) => {
  return path.join(__dirname, "/Back-End/img", hash + ".png");
};

export const saveImgBase64 = async (base64Data, hash) => {
  let error = null;
  try {
    if (!(await isFileCached(hash))) {
      const dir = getHashPath(hash);
      await writeFile(dir, base64Data, "base64", (error) => {
        console.log(error);
        error = "Something went wrong saving the file";
      });
    }
    throw new Error("File is cached");
  } catch (err) {
    error = err;
  }
  return [error, hash];
};

export const getHash = () => crypto.randomBytes(10).toString("hex");

export const removeCache = async (hash) => {
  let error = null;
  try {
    const directory = await getHashFile(hash);
    await unlink(directory, (e) => {
      console.log(e);
      error = "Somenthing went wrong deleting file";
    });
  } catch (err) {
    error = err;
  }
  return error;
};
