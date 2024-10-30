import Navbar from "./components/Navbar";
import ThemeProvider from "./components/ThemeProvider";
import "./globals.css";

export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-gray-900">
        <ThemeProvider />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
