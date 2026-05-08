import { Router } from "express";
import { ok } from "@/lib/api-response.js";
import { prisma } from "@/lib/prisma.js";
import { authenticate, requireRoles } from "@/middleware/auth.js";

export const adminRoutes = Router();

adminRoutes.use(authenticate, requireRoles("moderator", "finance_admin", "super_admin"));

adminRoutes.get("/dashboard", async (_req, res, next) => {
  try {
    const [users, vendors, products, orders] = await Promise.all([
      prisma.user.count(),
      prisma.vendor.count(),
      prisma.product.count(),
      prisma.order.count()
    ]);
    return ok(res, { users, vendors, products, orders });
  } catch (error) {
    return next(error);
  }
});
