import { Redis } from "@upstash/redis";
import { Request, Response, NextFunction } from "express";

const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX) || 5;
const WINDOW_SECONDS = Number(process.env.RATE_LIMIT_WINDOW) || 300;

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function rateLimit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const ip = req.ip;
  const key = `rate:${ip}`;

  let count = (await redis.get(key)) as number | null;

  if (count !== null && count >= MAX_REQUESTS) {
    return res
      .status(429)
      .json({ error: "Too many requests. Please try again later." });
  }

  // Increment or initialize the counter
  await redis.set(key, (count ?? 0) + 1, { ex: WINDOW_SECONDS });

  next();
}
