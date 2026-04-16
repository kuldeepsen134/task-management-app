import redis from "../config/redis.js";

export const clearCache = async (pattern) => {
  try {
    const keys = await redis.keys(`${pattern}*`);
    if (keys.length) {
      await redis.del(keys);
    }
  } catch (error) {
    console.log("Cache clear error", error);
  }
};