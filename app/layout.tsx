import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import { ThemeProvider, noFlashThemeScript } from "@/components/ThemeProvider";
import LoadingScreen from "@/components/LoadingScreen";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — Backend Developer in Training`,
  description:
    "Portfolio of Muhammad Abhiraffa Hamizan, a Software Engineering student at SMK PGRI 3 Malang focused on backend development, APIs, and databases — and a competitive chess player.",
  openGraph: {
    title: `${profile.name} — Backend Developer in Training`,
    description:
      "Software Engineering student building reliable backend systems. Chess player. Based in Malang, East Java, Indonesia.",
    type: "website",
  },
  metadataBase: undefined,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body className="font-body text-[16px] leading-relaxed">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-ink focus:text-bg focus:px-4 focus:py-2 focus:rounded-s"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <LoadingScreen />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}