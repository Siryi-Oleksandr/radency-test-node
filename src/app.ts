import express, { NextFunction, Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import notesRouter from "routes/notesRouter";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/notes", notesRouter);

// *** error handlers:
app.use((_req: any, res: Response) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /",
    data: "Not found such route",
  });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    message,
  });
});

export default app;
