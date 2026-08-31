import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">EV Bike Showroom</h1>
      <div className="flex gap-4">
        <Link
          href="/register"
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="rounded-md border border-black px-4 py-2"
        >
          Login
        </Link>
      </div>
    </div>
  );
}