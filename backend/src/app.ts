import express,{Request,Response,NextFunction} from 'express';
import morgan from "morgan";
import { userRoute } from './routes/User.Routes';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
}
);
app.use('/users',userRoute);

// Error-handling middleware (place it here)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});
export default app;
