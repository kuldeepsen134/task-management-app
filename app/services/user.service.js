import * as repo from "../repositories/user.repository.js";

export const getAllUsers = async (query) => {

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;

  const search = query.search || "";

  const skip = (page - 1) * limit;

  return repo.getAllUsers({
    search,
    skip,
    limit
  });
};


export const getProfile = async (userId) => {
  const user = await repo.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateUser = async (userId, data) => {
  const user = await repo.updateUser(userId, data);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const deleteUser = async (userId) => {
  const user = await repo.deleteUser(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return true;
};