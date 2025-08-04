import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlotForge - Creador de Historias Interactivas",
  description:
    "Crea historias interactivas ramificadas donde cada decisión cuenta. Construye narrativas envolventes como novelas visuales y juegos narrativos.",
  keywords: [
    "historias interactivas",
    "novelas visuales",
    "juegos narrativos",
    "creador de historias",
    "narrativas ramificadas",
    "escribir historias",
    "crear juegos narrativos",
    "historias ramificadas",
    "escribir novelas visuales",
    "historias de decisiones",
    "narrativas interactivas",
    "escribir juegos de decisiones",
    "historias de ramificación",
    "crear novelas interactivas",
    "escribir narrativas interactivas",
    "historias de múltiples finales",
    "crear historias de decisiones",
    "escribir historias interactivas",
    "historias de elecciones",
    "crear narrativas ramificadas",
    "escribir juegos de elecciones",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
            {children}
            <Toaster position="top-right" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
