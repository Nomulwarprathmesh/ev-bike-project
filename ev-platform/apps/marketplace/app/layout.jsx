import "./globals.css";
import ClientShell from "./client-shell";

export const metadata = {
  title: "Voltrix EV Marketplace",
  description: "Compare, test ride, finance, and buy electric scooters."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
