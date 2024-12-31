
import app from './app';
import { PORT } from './config/Env';
import { connectDB } from './config/Db';
import {getRedisClient} from './config/Redis';

getRedisClient();
connectDB().then(() => app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
)
