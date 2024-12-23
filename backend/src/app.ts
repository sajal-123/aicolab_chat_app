import express,{Request,Response,NextFunction, urlencoded} from 'express';
import morgan from "morgan";

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use((err:any, req:Request, res:Response, next:NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default app;
