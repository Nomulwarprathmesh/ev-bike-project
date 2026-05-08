import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { fail } from "@/lib/api-response.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    return fail(res, 400, "VALIDATION_ERROR", "Invalid request", error.flatten());
  }

  const status = typeof error.status === "number" ? error.status : 500;
  if (status >= 500) console.error(error);
  return fail(res, status, error.code ?? "INTERNAL_SERVER_ERROR", status >= 500 ? "Internal server error" : error.message);
};
