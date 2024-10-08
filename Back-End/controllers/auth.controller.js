import User from "../models/user.model.js";
import Images from "../models/images.model.js";
import Ai_options from "../models/ai_options.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";
import { env } from "../utils/env.js";
const COOKIE_OPTIONS = {
  expires: new Date(Date.now() + 3600 * 1000 * 24 * 180 * 1),
  path: "/",
  secure: true,
  sameSite: "none",
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const userFound = await User.findOne({ username });
  if (!userFound)
    return res.status(400).json({ message: "User or password wrong" });
  const isValid = await bcrypt.compare(password, userFound.password);
  if (!isValid)
    return res.status(400).json({ message: "User or password wrong" });
  const token = await generateToken({ id: userFound._id });
  res.cookie("token", token, COOKIE_OPTIONS);
  res.json({ id: userFound._id, username: userFound.username });
};
export const register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const userFound = await User.findOne({ username });
    if (userFound)
      return res.status(400).json({ message: "User already used" });
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hash,
      email,
    });
    const userSaved = await newUser.save();
    const newImages = new Images({
      user: userSaved._id,
      images: [],
    });
    newImages.save();
    await new Ai_options({ user: userSaved._id }).save();
    const token = await generateToken({ id: userSaved._id });
    res.cookie("token", token, COOKIE_OPTIONS);
    res.json({ id: newUser._id, username: newUser.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "No user Found" });
  res.json({ username: userFound.username, password: userFound.password });
};
export const getEmail = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "No user Found" });
  res.json({ email: userFound.email });
};
export const updateData = async (req, res) => {
  const { password, NewPassword, NewUsername } = req.body;
  const userFound = await User.findById(req.user.id);
  if (!userFound)
    return res.status(400).json({ message: "User not found in database" });
  const isValid = await bcrypt.compare(password, userFound.password);
  if (!isValid) return res.status(401).json({ message: "Wrong password" });
  if (NewUsername) userFound.username = NewUsername;
  if (NewPassword) {
    const hash = await bcrypt.hash(NewPassword, 10);
    userFound.password = hash;
  }
  await userFound.save();
  res.sendStatus(204);
};
export const updateEmail = async (req, res) => {
  const { password, email } = req.body;
  const userFound = await User.findById(req.user.id);
  if (!userFound)
    return res.status(400).json({ message: "User not found in database" });
  const isValid = await bcrypt.compare(password, userFound.password);
  if (!isValid) return res.status(401).json({ message: "Wrong password" });
  if (!email)
    return res.status(404).json({ message: "Email missing in payload" });
  userFound.email = email;
  await userFound.save();
  res.sendStatus(204);
};
export const deleteUser = async (req, res) => {
  const ImagesFound = await Images.findOneAndDelete({ user: req.user.id });
  if (!ImagesFound) return res.sendStatus(500);
  const userFound = await User.findByIdAndDelete(req.user.id);
  if (!userFound) return res.sendStatus(500);
  res.status(200).json({ user: userFound.username });
};
export const validateToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.sendStatus(401).json({ message: "Unautorized" });

  const [error, user] = await jwt.verify(
    token,
    env.SECRET_TOKEN,
    async (err, user) => {
      if (err) return ["Unautorized", null];
      return [null, user];
    }
  );
  if (error) {
    await res.cookie("token", "", { expires: new Date(0) });
    return res.sendStatus(401).json({ message: "Unautorized" });
  }
  const userFound = User.findById(user.id);
  if (!userFound) {
    await res.cookie("token", "", { expires: new Date(0) });
    return res.sendStatus(401).json({ message: "Unautorized" });
  }
  res.json({
    id: userFound._id,
    username: userFound.username,
  });
};
export const getAiToken = async (id) => {
  const { ai_tokens } = await Ai_options.findOne({ user: id });
  return ai_tokens;
};
export const sendAiTokens = async (req, res) => {
  const tokens = await getAiToken(req.user.id);
  return res.status(200).json(tokens);
};
export const deleteOpenAiToken = async (req, res) => {
  const db = await Ai_options.findOne({ user: req.user.id });
  db.ai_tokens.openai = "";
  await db.save();
  res.sendStatus(204);
};
export const updateAiTokens = async (req, res) => {
  const { openai, stable_diffusion } = req.body;
  const tokens = await Ai_options.findOne({ user: req.user.id });
  if (openai) {
    tokens.ai_tokens.openai = openai;
  }
  if (stable_diffusion) {
    tokens.ai_tokens.stable_diffusion = stable_diffusion;
  }
  await tokens.save();
  return res.status(200).json(tokens);
};
