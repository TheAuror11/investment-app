const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = client;
