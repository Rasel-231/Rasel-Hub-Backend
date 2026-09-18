import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import Routes from "./app/Routes";
import { StatusCodes } from "http-status-codes";
import cookieParser from "cookie-parser";
const app = express();

//middlewares
app.use(
  cors({

    // origin: "http://localhost:3000",

    origin: "https://rasel-hub-frontend.vercel.app",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
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

//error handler
app.use(
  (
    error: unknown,
    req: Request,
    res: Response,
    next: (arg0?: never) => void
  ) => {
    const err = error as {
      statusCode?: number;
      status?: number;
      message?: string;
      issues?: { message: string }[];
    };
    const status = err.statusCode || err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.issues?.[0]?.message || err.message || "Internal Server Error";
    res.status(status).json({
      success: false,
      message,
      errMessage: err.issues || [],
    });
  }
);

export default app;
