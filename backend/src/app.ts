import express,{Request,Response,NextFunction} from 'express';
import morgan from "morgan";
import { userRoute } from './routes/User.Routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));  // so that you can see al request response in the console
app.use(express.json()); // To parse incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

app.use(
  cors({
      origin: ['http://localhost:3000', 'https://localhost:3001'], // Allowed origins
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
      credentials: true, // Allow cookies or authentication headers
  })
);

app.get('/he',(req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/users',userRoute);

// Error-handling middleware (place it here)
export default app;
