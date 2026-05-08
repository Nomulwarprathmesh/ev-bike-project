import { Router } from "express";
import { adminRoutes } from "@/routes/modules/admin.routes.js";
import { authRoutes } from "@/routes/modules/auth.routes.js";
import { marketplaceRoutes } from "@/routes/modules/marketplace.routes.js";
import { vendorRoutes } from "@/routes/modules/vendor.routes.js";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/", marketplaceRoutes);
routes.use("/vendor", vendorRoutes);
routes.use("/admin", adminRoutes);
