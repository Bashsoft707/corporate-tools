import "reflect-metadata";
import dotenv from "dotenv";
import express, { NextFunction, Response, Request } from "express";
import cors from "cors";
import { handleError } from "./helpers";
import rateLimit from "express-rate-limit";
import { morganStream, logger } from "./utils";
import morgan from "morgan";
import compression from "compression";

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1000,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(morgan("combined", { stream: morganStream }));
app.use(express.json({ limit: "50mb" }));
app.use(express.text());
app.use(compression());

app.use(limiter);

const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (_req, res) => {
  res.send("Hello, Welcome to Itump Service Corporate tools!");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  logger.error(`Error: ${err}`);
  handleError(err, res);
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
