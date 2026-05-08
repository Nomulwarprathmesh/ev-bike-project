import { Router } from "express";
import { ok } from "@/lib/api-response.js";
import { prisma } from "@/lib/prisma.js";
import { authenticate, requireRoles } from "@/middleware/auth.js";

export const vendorRoutes = Router();

vendorRoutes.use(authenticate, requireRoles("vendor_owner", "vendor_staff", "super_admin"));

vendorRoutes.get("/dashboard", async (req, res, next) => {
  try {
    const vendorId = req.user!.vendorId;
    const [products, orders] = await Promise.all([
      prisma.product.count({ where: { vendorId } }),
      prisma.order.count({ where: { vendorId } })
    ]);
    return ok(res, { products, orders });
  } catch (error) {
    return next(error);
  }
});
