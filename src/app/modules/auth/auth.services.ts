import jwt from "jsonwebtoken";
import config from "../../../config";
import Admin from "./auth.model";
import { ILoginResponse, ILoginRequest } from "./auth.interfaces";

// Access Token তৈরি
const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, config.access_token as string, {
    expiresIn: "10m",
  });
};

// Refresh Token তৈরি
const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, config.refresh_token as string, {
    expiresIn: "7d",
  });
};

// Login Service (password ছাড়া)
const authLogin = async (payload: ILoginRequest): Promise<ILoginResponse> => {
  const { userId } = payload;

  const user = await Admin.findOne({ userId });

  if (!user) {
    throw new Error("UserID not found");
  }

  // Token generate
  const accessToken = generateAccessToken(user.userId);
  const refreshToken = generateRefreshToken(user.userId);

  return {
    userId: user.userId,
    token: accessToken,
    refreshToken,
    message: "User Login Successful",
  };
};

// Refresh Token Service
const refreshToken = async (token: string): Promise<ILoginResponse> => {
  try {
    const decoded = jwt.verify(token, config.refresh_token as string) as {
      userId: string;
    };
    const user = await Admin.findOne({ userId: decoded.userId });
    if (!user) {
      throw new Error("UserID not found");
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken(user.userId);
    const newRefreshToken = generateRefreshToken(user.userId);

    return {
      userId: user.userId,
      token: newAccessToken,
      refreshToken: newRefreshToken,
      message: "Access token refreshed successfully",
    };
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

//verify token

const verifyToken = async (token: string): Promise<any> => {
  try {
    const decoded = jwt.verify(token, config.access_token as string) as {
      userId: string;
    };
    console.log("decoded Token", decoded);
    return { userId: decoded.userId };
  } catch (error) {
    console.log(error);
  }
};

export const authServices = {
  authLogin,
  refreshToken,
  verifyToken,
};
