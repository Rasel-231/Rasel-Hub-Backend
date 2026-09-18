import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../config";

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const auth = () => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const bearerToken = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : undefined;

      const token =
        bearerToken || req.cookies?.accessToken || req.cookies?.token;

      if (!token) {
        return res
          .status(401)
          .json({ message: "Access token is missing" });
      }

      const verifiedUser = jwt.verify(token, config.access_token as string);
      req.user = verifiedUser;

      next();
    } catch (error) {
      console.error("Unauthorized user:", error);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};