import { clearCache } from "./clearCache.js";

// Helper to clear all task related cache
export const clearTaskCache = async (userId) => {
  await clearCache(`tasks:${userId}`);
  await clearCache(`tasks-analytics:${userId}`);
  await clearCache(`dashboard:${userId}`);
  await clearCache(`analytics:${userId}`);
};

// Helper to clear all user related cache
export const clearUserCache = async (userId) => {
  await clearCache(`profile:${userId}`);
  await clearCache(`users`);
};
