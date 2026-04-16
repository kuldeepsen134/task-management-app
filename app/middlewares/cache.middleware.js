import redisClient from "../config/redis.js";

const cache = (keyPrefix) => {
  return async (req, res, next) => {

    const key = `${keyPrefix}:${req.user?.id || "all"}`;

    const cached = await redisClient.get(key);

    if (cached) {
      return res.json(JSON.parse(cached));
    }

    res.sendResponse = res.json;

    res.json = (body) => {
      redisClient.setEx(key, 300, JSON.stringify(body)); // 5 min cache
      res.sendResponse(body);
    };

    next();
  };
};

export default cache;