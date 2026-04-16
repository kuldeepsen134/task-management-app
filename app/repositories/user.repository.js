import User from "../models/user.model.js";

export const createUser = (data) => User.create(data);

export const getAllUsers = ({ search, skip, limit }) =>
  User.find({
    isDeleted: false,
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ],
  })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

export const findByEmail = (email) =>
  User.findOne({
    email,
    isDeleted: false,
  });

export const findById = (id) =>
  User.findOne({
    _id: id,
    isDeleted: false,
  });

export const updateUser = (id, data) =>
  User.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

export const deleteUser = (id) =>
  User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );