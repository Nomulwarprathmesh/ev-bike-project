import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { corsOrigins } from "@/config/env.js";
import { errorHandler } from "@/middleware/error-handler.js";
import { routes } from "@/routes/index.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.use(express.json({ limit: "1mb" }));
  app.use(cors({ origin: corsOrigins, credentials: true }));
  app.use(rateLimit({ windowMs: 60_000, limit: 180 }));
  app.use(morgan("tiny"));

  app.get("/health", (_req, res) => res.json({ ok: true, service: "ev-platform-backend" }));
  app.use("/api", routes);
  app.use(errorHandler);

  return app;
}
