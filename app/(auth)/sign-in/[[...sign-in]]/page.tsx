"use client";
import { SignIn } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignInPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-balance text-4xl font-semibold md:text-5xl xl:text-6xl xl:[line-height:1.125] mb-2">
            Bienvenido a <span className="text-blue-600">PlotForge</span>
          </h1>
          <p className="text-gray-600">
            Inicia sesión para crear historias interactivas
          </p>
        </div>
        <SignIn
          appearance={{
            theme: theme === "dark" ? shadcn : undefined,
            elements: {
              rootBox: "w-full mx-auto",
              card: "shadow-lg border-0 bg-background",
            },
          }}
        />
      </div>
    </div>
  );
}
