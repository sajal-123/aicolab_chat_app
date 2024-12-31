import Redis from "ioredis";

// Create a Redis connection instance
let redis:any;

const getRedisClient = () => {
  if (!redis) {
    redis = new Redis({
      host: 'localhost', // Docker host (or the IP of the server running Redis)
      port: 6379,        // Redis port
    });

    // Event listeners
    redis.on('connect', () => {
      console.log('Connected to Redis');
    });

    redis.on('error', (err:any) => {
      console.error('Redis connection error:', err);
    });
  }
  return redis;
};

// Export the Redis client
export {getRedisClient};
export {redis};
