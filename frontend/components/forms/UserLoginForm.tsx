"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/axios";

import {
  loginSchema,
  LoginFormValues,
} from "@/lib/validators/userSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserLoginForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    setLoading(true);

    try {
      await api.post("/users/login", data);

      router.push("/dashboard");
    } catch (err: any) {
      setServerError(
        err?.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="fixed inset-0 h-dvh w-full overflow-hidden bg-[#0B0D10] text-white">

      {/* =====================================================
          DESKTOP
      ====================================================== */}

      <div className="hidden h-full w-full lg:grid lg:grid-cols-[1.08fr_0.92fr]">

        {/* =================================================
            DESKTOP LEFT HERO
        ================================================== */}

        <section className="relative h-full min-w-0 overflow-hidden">

          {/* Logo */}
          <div className="absolute left-8 top-8 z-30 xl:left-10 xl:top-9">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#C6FF3D]" />

              <span className="text-xl font-bold tracking-[0.16em]">
                VOLT
              </span>
            </div>
          </div>

          {/* Main green glow */}
          <div
            className="
              pointer-events-none
              absolute
              left-[61%]
              top-[43%]
              h-[58vh]
              w-[58vh]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              blur-[110px]
            "
            style={{
              background:
                "radial-gradient(circle, rgba(198,255,61,0.20) 0%, rgba(198,255,61,0.07) 42%, transparent 72%)",
            }}
          />

          {/* Large decorative circle */}
          <div
            className="
              pointer-events-none
              absolute
              -left-[310px]
              top-[25%]
              h-[680px]
              w-[680px]
              rounded-full
              border
              border-white/[0.035]
            "
          />

          {/* Small decorative circle */}
          <div
            className="
              pointer-events-none
              absolute
              -left-[190px]
              top-[34%]
              h-[500px]
              w-[500px]
              rounded-full
              border
              border-white/[0.035]
            "
          />

          {/* =================================================
              DESKTOP IMAGE
          ================================================== */}

          <div
            className="
              absolute
              left-[61%]
              top-[44%]
              z-10
              flex
              w-[108%]
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center

              xl:left-[64%]
              xl:w-[115%]

              2xl:left-[66%]
              2xl:w-[120%]
            "
          >
            <img
              src="/login-hero2.png"
              alt="Electric Scooter"
              className="
                block
                h-auto
                max-h-[74vh]
                w-full
                object-contain
                drop-shadow-[0_45px_90px_rgba(0,0,0,0.85)]
              "
            />
          </div>

          {/* =================================================
              DESKTOP HERO TEXT
          ================================================== */}

          <div
            className="
              absolute
              bottom-8
              left-8
              z-20
              xl:bottom-10
              xl:left-10
            "
          >
            <p
              className="
                mb-2
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.32em]
                text-[#C6FF3D]
              "
            >
              Electric mobility
            </p>

            <h1
              className="
                max-w-[620px]
                text-[40px]
                font-semibold
                leading-[0.98]
                tracking-[-0.045em]
                xl:text-[50px]
              "
            >
              Power up your{" "}
              <span className="text-[#C6FF3D]">
                next ride.
              </span>
            </h1>

            <p className="mt-3 text-xs text-zinc-500 xl:text-sm">
              Smart, sustainable and built for the way you move.
            </p>
          </div>
        </section>

        {/* =================================================
            DESKTOP RIGHT LOGIN
        ================================================== */}

        <section
          className="
            relative
            flex
            h-full
            min-w-0
            items-center
            justify-start
            px-8
            xl:px-10
            2xl:px-14
          "
        >
          <div className="w-full max-w-[400px]">

            {/* Heading */}
            <div className="mb-7">
              <h2
                className="
                  text-[29px]
                  font-semibold
                  tracking-[-0.03em]
                  xl:text-[31px]
                "
              >
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Log in to your account to continue.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >

              {/* Email */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-zinc-300"
                >
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  disabled={loading}
                  {...register("email")}
                  className="
                    h-11
                    w-full
                    rounded-lg
                    border-zinc-800
                    bg-[#111419]
                    px-3.5
                    text-sm
                    text-white
                    shadow-none
                    placeholder:text-zinc-600
                    transition

                    focus-visible:border-[#C6FF3D]
                    focus-visible:ring-1
                    focus-visible:ring-[#C6FF3D]
                  "
                />

                {errors.email && (
                  <p className="text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">

                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Password
                  </Label>

                  <button
                    type="button"
                    className="
                      text-xs
                      text-zinc-500
                      transition
                      hover:text-[#C6FF3D]
                    "
                  >
                    Forgot password?
                  </button>
                </div>

                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  disabled={loading}
                  {...register("password")}
                  className="
                    h-11
                    w-full
                    rounded-lg
                    border-zinc-800
                    bg-[#111419]
                    px-3.5
                    text-sm
                    text-white
                    shadow-none
                    placeholder:text-zinc-600
                    transition

                    focus-visible:border-[#C6FF3D]
                    focus-visible:ring-1
                    focus-visible:ring-[#C6FF3D]
                  "
                />

                {errors.password && (
                  <p className="text-xs text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Server error */}
              {serverError && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2.5">
                  <p className="text-xs leading-5 text-red-400">
                    {serverError}
                  </p>
                </div>
              )}

              {/* Login */}
              <Button
                type="submit"
                disabled={loading}
                className="
                  mt-2
                  h-11
                  w-full
                  rounded-lg
                  bg-[#C6FF3D]
                  font-semibold
                  text-[#0B0D10]
                  shadow-none
                  transition-all

                  hover:bg-[#B5EB35]
                  hover:shadow-[0_0_25px_rgba(198,255,61,0.15)]

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-[#0B0D10]/30
                        border-t-[#0B0D10]
                      "
                    />

                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>

              {/* Sign up */}
              <p className="pt-1 text-center text-sm text-zinc-500">
                Don&apos;t have an account?{" "}

                <a
                  href="/register"
                  className="
                    font-medium
                    text-[#C6FF3D]
                    transition
                    hover:text-[#D5FF70]
                    hover:underline
                  "
                >
                  Sign up
                </a>
              </p>
            </form>

            {/* Terms */}
            <p className="mt-7 text-center text-[10px] leading-5 text-zinc-700">
              By continuing, you agree to our Terms of Service
              and Privacy Policy.
            </p>
          </div>
        </section>
      </div>

      {/* =====================================================
          MOBILE
      ====================================================== */}

      <section
        className="
          flex
          h-full
          w-full
          flex-col
          overflow-hidden
          bg-[#0B0D10]
          px-4
          sm:px-6
          lg:hidden
        "
      >

        {/* =================================================
            MOBILE LOGO
        ================================================== */}

        <header className="flex h-[8%] shrink-0 items-center">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#C6FF3D]" />

            <span className="text-lg font-bold tracking-[0.16em]">
              VOLT
            </span>
          </div>
        </header>

        {/* =================================================
            MOBILE IMAGE CARD
        ================================================== */}

        <div
          className="
            relative
            flex
            min-h-0
            flex-[0.72]
            items-center
            justify-center
          "
        >

          {/* Glow */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[65vw]
              max-h-[300px]
              w-[75vw]
              max-w-[390px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              blur-[70px]
            "
            style={{
              background:
                "radial-gradient(circle, rgba(198,255,61,0.17) 0%, rgba(198,255,61,0.05) 45%, transparent 72%)",
            }}
          />

          {/* Image card */}
          <div
            className="
              relative
              flex
              h-full
              w-full
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.05]
              bg-[#0E1114]
            "
          >

            {/* Inner glow */}
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[70%]
                w-[80%]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                blur-[55px]
              "
              style={{
                background:
                  "radial-gradient(circle, rgba(198,255,61,0.14), transparent 70%)",
              }}
            />

            {/* Decorative ring */}
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[85%]
                aspect-square
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-white/[0.035]
              "
            />

            {/* Scooter */}
            <img
              src="/login-hero2.png"
              alt="Electric Scooter"
              className="
                relative
                z-10
                block
                h-auto
                w-[115%]
                max-h-[31vh]
                max-w-[620px]
                object-contain
                drop-shadow-[0_30px_65px_rgba(0,0,0,0.9)]
              "
            />
          </div>
        </div>

        {/* =================================================
            MOBILE HEADING
        ================================================== */}

        <div className="shrink-0 px-1 pb-3 pt-3">

          <p
            className="
              mb-1.5
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#C6FF3D]
            "
          >
            Electric mobility
          </p>

          <h1
            className="
              text-[27px]
              font-semibold
              leading-[0.98]
              tracking-[-0.04em]
              sm:text-[31px]
            "
          >
            Power up your{" "}
            <span className="text-[#C6FF3D]">
              next ride.
            </span>
          </h1>

          <p className="mt-1.5 text-[10px] text-zinc-500">
            Smart, sustainable and built for the way you move.
          </p>
        </div>

        {/* =================================================
            MOBILE LOGIN CARD
        ================================================== */}

        <div
          className="
            shrink-0
            rounded-2xl
            border
            border-white/[0.06]
            bg-[#0E1114]
            p-4
            shadow-[0_20px_60px_rgba(0,0,0,0.35)]
            sm:p-5
          "
        >

          {/* Login heading */}
          <div className="mb-3">
            <h2 className="text-xl font-semibold tracking-[-0.025em]">
              Welcome back
            </h2>

            <p className="mt-0.5 text-[11px] text-zinc-500">
              Log in to your account to continue.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2.5"
          >

            {/* Email */}
            <div className="space-y-1">
              <Label
                htmlFor="mobile-email"
                className="text-[11px] font-medium text-zinc-300"
              >
                Email
              </Label>

              <Input
                id="mobile-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                disabled={loading}
                {...register("email")}
                className="
                  h-9
                  w-full
                  rounded-lg
                  border-zinc-800
                  bg-[#111419]
                  px-3
                  text-xs
                  text-white
                  placeholder:text-zinc-600
                  focus-visible:border-[#C6FF3D]
                  focus-visible:ring-1
                  focus-visible:ring-[#C6FF3D]
                "
              />

              {errors.email && (
                <p className="text-[10px] text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">

              <div className="flex items-center justify-between">
                <Label
                  htmlFor="mobile-password"
                  className="text-[11px] font-medium text-zinc-300"
                >
                  Password
                </Label>

                <button
                  type="button"
                  className="
                    text-[10px]
                    text-zinc-500
                    transition
                    hover:text-[#C6FF3D]
                  "
                >
                  Forgot password?
                </button>
              </div>

              <Input
                id="mobile-password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                disabled={loading}
                {...register("password")}
                className="
                  h-9
                  w-full
                  rounded-lg
                  border-zinc-800
                  bg-[#111419]
                  px-3
                  text-xs
                  text-white
                  placeholder:text-zinc-600
                  focus-visible:border-[#C6FF3D]
                  focus-visible:ring-1
                  focus-visible:ring-[#C6FF3D]
                "
              />

              {errors.password && (
                <p className="text-[10px] text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Server error */}
            {serverError && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-1.5">
                <p className="text-[10px] leading-4 text-red-400">
                  {serverError}
                </p>
              </div>
            )}

            {/* Login button */}
            <Button
              type="submit"
              disabled={loading}
              className="
                h-9
                w-full
                rounded-lg
                bg-[#C6FF3D]
                text-xs
                font-semibold
                text-[#0B0D10]
                transition-all
                hover:bg-[#B5EB35]
                hover:shadow-[0_0_20px_rgba(198,255,61,0.12)]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            {/* Sign up */}
            <p className="pt-0.5 text-center text-[11px] text-zinc-500">
              Don&apos;t have an account?{" "}

              <a
                href="/register"
                className="
                  font-medium
                  text-[#C6FF3D]
                  hover:underline
                "
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}