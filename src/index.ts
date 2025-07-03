import "reflect-metadata";
import dotenv from "dotenv";
import express, { NextFunction, Response, Request } from "express";
import cors from "cors";
import { handleError } from "./helpers";
import rateLimit from "express-rate-limit";
import { morganStream, logger } from "./utils";
import morgan from "morgan";
import compression from "compression";
import router from "./routes";

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

// app.get("/arizona", (req: Request, res: Response, next: NextFunction) => {
//   (async () => {
//     try {
//       const response = await axios.get(
//         "https://bizfileonline.sos.ca.gov/search/business",
//         {
//           data: {
//             Payload: {
//               page: 1,
//               size: 8,
//               search: "name",
//               name: req.query.name,
//               v: "201912231700",
//             },
//           },
//           headers: {
//             Accept: "application/json",
//             "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.01",
//             "Content-Type": "application/json",
//             referer: "https://apps.azsos.gov/apps/tntp/se.html",
//             "sec-ch-ua":
//               '"Google-Chrome",v=137,"Chromium",v="137","Not/A)Brand",v="24"',
//             "User-Agent":
//               "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/",
//             "x-requested-with": "SMLHttpRequest",
//             BNI_persistense: process.env.ARIZONA_API_KEY || "arizona_api_key",
//           },
//         }
//       );

//       const data = response.data;

//       return res.status(200).json({ success: true, data });
//     } catch (error) {
//       console.error("Error fetching data from Arizona:", error);
//       logger.error(`Error fetching data from Arizona: ${error}`);
//       return res
//         .status(500)
//         .json({ success: false, message: "Internal Server Error" });
//     }
//   })().catch(next);
// });

app.use("/api", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  logger.error(`Error: ${err}`);
  handleError(err, res);
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
