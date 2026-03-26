import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../config";

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const auth = () => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("Middleware_Token", req.cookies.token);
    try {
      let token =
        req.headers.authorization?.split(" ")[1] || req.cookies?.token;

      if (!token && req.cookies?.token) {
        token = req.cookies.token;
      }

      if (!token) {
        return res
          .status(401)
          .json({ message: "Authorization token is missing" });
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
