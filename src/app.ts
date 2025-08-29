import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import Routes from "./app/Routes";
import { StatusCodes } from "http-status-codes";
import cookieParser from "cookie-parser";
const app = express();

const port = 5001;

//middlewares
app.use(
  cors({
    origin: "https://my-frontend-d7jifd1e8-halifaxs-projects.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//route middlewares

app.use("/api/v1", Routes);

//not found url

app.use((req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errMessage: [
      {
        path: req.originalUrl,
        message: "Api not found",
      },
    ],
  });
});

export default app;
