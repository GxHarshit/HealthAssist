import jwt from "jsonwebtoken";
import redisClient from "../services/redis.services.js";

export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Token not found');
        }
        const isBlacklisted = await redisClient.get(token);
        if (isBlacklisted) {
            res.cookie('token', '', );
            return res.status(401).json({ error: "Unauthorised" });
        }
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    }catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Unauthorised" });
    }
}