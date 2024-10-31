import Header from "@/components/Header";
import ThemeProvider from "./components/ThemeProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-zinc-50 dark:bg-zinc-900">
        <ThemeProvider>
          <Header />
          <main className="max-w-screen-2xl mx-auto">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
