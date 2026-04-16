import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import * as repo from "../repositories/user.repository.js";

export const register = async (data) => {
  const exists = await repo.findByEmail(data.email);

  if (exists) {
    throw new Error("User already exists");
  }

  const hashed = await bcrypt.hash(data.password, 10);

  const user = await repo.createUser({
    ...data,
    password: hashed,
  });

  return {
    id: user._id,
    email: user.email,
    name: user.name,
  };
};

export const login = async (data) => {
  const user = await repo.findByEmail(data.email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};