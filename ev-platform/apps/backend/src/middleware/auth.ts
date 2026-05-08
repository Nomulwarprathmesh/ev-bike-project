import type { NextFunction, Request, Response } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "@/config/env.js";
import { fail } from "@/lib/api-response.js";

export type UserRole =
  | "customer"
  | "vendor_owner"
  | "vendor_staff"
  | "moderator"
  | "finance_admin"
  | "super_admin";

export interface AuthUser {
  id: string;
  role: UserRole;
  vendorId?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function signAccessToken(user: AuthUser) {
  return jwt.sign(user, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_TTL as SignOptions["expiresIn"] });
}

export function signRefreshToken(user: AuthUser) {
  return jwt.sign(user, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_TTL as SignOptions["expiresIn"] });
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : req.cookies?.accessToken;

  if (!token) return fail(res, 401, "UNAUTHENTICATED", "Authentication required");

  try {
    req.user = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthUser;
    return next();
  } catch {
    return fail(res, 401, "INVALID_TOKEN", "Invalid or expired token");
  }
}

export function requireRoles(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return fail(res, 401, "UNAUTHENTICATED", "Authentication required");
    if (!roles.includes(req.user.role)) return fail(res, 403, "FORBIDDEN", "Insufficient permissions");
    return next();
  };
}
