import { Router } from "express";
import { ok } from "@/lib/api-response.js";
import { prisma } from "@/lib/prisma.js";
import { authenticate } from "@/middleware/auth.js";

export const marketplaceRoutes = Router();

marketplaceRoutes.get("/products", async (_req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: { approvalStatus: "approved" },
      include: { brand: true, specs: true, images: true, colors: true },
      take: 50
    });
    return ok(res, products);
  } catch (error) {
    return next(error);
  }
});

marketplaceRoutes.get("/showrooms", async (_req, res, next) => {
  try {
    return ok(res, await prisma.showroom.findMany({ where: { status: "active" } }));
  } catch (error) {
    return next(error);
  }
});

marketplaceRoutes.get("/cart", authenticate, async (req, res, next) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: { userId: req.user!.id, status: "active" },
      include: { items: { include: { product: true, showroom: true } } }
    });
    return ok(res, cart ?? { items: [] });
  } catch (error) {
    return next(error);
  }
});
