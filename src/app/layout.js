import Header from "@/components/Header";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-zinc-50 dark:bg-zinc-900">
        <Header />
        <main className="max-w-screen-2xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
