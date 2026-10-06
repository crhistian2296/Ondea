import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import {
  AppHeader,
  PageTransition,
  Providers,
  ThemeScript,
} from "@/components";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Ondea",
  description: "Mini-aplicación para escuchar podcasts musicales",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={roboto.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <Providers>
          <AppHeader />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
        </Providers>
      </body>
    </html>
  );
}
