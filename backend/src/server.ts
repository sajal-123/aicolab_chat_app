
import app from './app';
import { PORT } from './config/Env';
import { connectDB } from './config/Db';

connectDB().then(() => app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
)
