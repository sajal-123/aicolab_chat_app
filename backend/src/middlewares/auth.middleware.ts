import jwt from 'jsonwebtoken';
import { redis } from '../config/Redis';
export const authMiddleware = async (req: any, res: any, next: any) => {
    try {
        // Get the token from the cookies or authorization header
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        // If no token is provided, return Unauthorized error
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const isBlackListed=await redis.get(token);
        
        if(isBlackListed){
            res.cookies.token="";
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Decode and verify the token using the secret
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        
        // Extract only the necessary fields (email, userId)
        const { email, userId } = decoded;
        
        // Attach the extracted data to the request object
        req.body.user = { email, userId };

        // Continue to the next middleware or route handler
        next();
    } catch (error: any) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
