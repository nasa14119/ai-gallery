import { env } from "./env.js"
import jwt from "jsonwebtoken";

export function generateToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      env.SECRET_TOKEN,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
}