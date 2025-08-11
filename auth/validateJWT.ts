import  Jwt  from "jsonwebtoken";
import { NextFunction, Request , Response } from "express";

interface RequestWithUser extends Request {
    user?: any;
}

export const validateJWT = (req: RequestWithUser, res: Response , next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = Jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
};
