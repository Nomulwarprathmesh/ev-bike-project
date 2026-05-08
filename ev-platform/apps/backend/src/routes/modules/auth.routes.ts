import bcrypt from "bcryptjs";
import { Router } from "express";
import { z } from "zod";
import { ok, fail } from "@/lib/api-response.js";
import { prisma } from "@/lib/prisma.js";
import { signAccessToken, signRefreshToken } from "@/middleware/auth.js";
import { validate } from "@/middleware/validate.js";

export const authRoutes = Router();

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

authRoutes.post("/register", validate(credentialsSchema.extend({ name: z.string().min(2), phone: z.string().optional() })), async (req, res, next) => {
  try {
    const existing = await prisma.user.findUnique({ where: { email: req.body.email } });
    if (existing) return fail(res, 409, "EMAIL_EXISTS", "Email is already registered");

    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        passwordHash: await bcrypt.hash(req.body.password, 12),
        role: "customer"
      },
      select: { id: true, name: true, email: true, role: true, status: true }
    });

    return ok(res, {
      user,
      accessToken: signAccessToken({ id: user.id, role: user.role }),
      refreshToken: signRefreshToken({ id: user.id, role: user.role })
    }, "Registered", 201);
  } catch (error) {
    return next(error);
  }
});

authRoutes.post("/login", validate(credentialsSchema), async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { email: req.body.email } });
    if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash))) {
      return fail(res, 401, "INVALID_CREDENTIALS", "Invalid email or password");
    }

    return ok(res, {
      user: { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status },
      accessToken: signAccessToken({ id: user.id, role: user.role }),
      refreshToken: signRefreshToken({ id: user.id, role: user.role })
    });
  } catch (error) {
    return next(error);
  }
});
