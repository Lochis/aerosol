import User from "../models/user.model.js";
import type { Request, Response } from "express";
import type { Request as JWTRequest } from "express-jwt";

// GET /me → retourne le user connecté
export const me = async (req: JWTRequest, res: Response) => {
  if (!req.auth?.sub) return res.status(401).json({ error: "Not authenticated" });

  const user = await User.findById(req.auth.sub).select("name tag email createdAt avatar_url");
  if (!user) return res.status(404).json({ error: "User not found" });

  return res.json(user);
};

// PUT /me → mettre à jour le user
export const update = async (req: JWTRequest, res: Response) => {
  if (!req.auth?.sub) return res.status(401).json({ error: "Not authenticated" });

  const user = await User.findById(req.auth.sub);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { name, tag, password } = req.body;

  if (name) user.name = name;
  if (tag) user.tag = tag;
  if (password) user.password = password; // virtual setter gère le hash

  await user.save();

  return res.json({ message: "User updated successfully", user });
};

// DELETE /me → supprimer le user
export const remove = async (req: JWTRequest, res: Response) => {
  if (!req.auth?.sub) return res.status(401).json({ error: "Not authenticated" });

  const user = await User.findById(req.auth.sub);
  if (!user) return res.status(404).json({ error: "User not found" });

  await User.findByIdAndDelete(req.auth.sub);

  return res.json({ message: "User deleted successfully" });
};

export default { me, update, remove };