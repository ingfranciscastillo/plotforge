"use client";
import { SignUp } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignUpPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-balance text-4xl font-semibold md:text-5xl xl:text-6xl xl:[line-height:1.125] mb-2">
            Únete a <span className="text-blue-600">PlotForge</span>
          </h1>
          <p className="text-gray-600">
            Crea tu cuenta y comienza a escribir historias interactivas
          </p>
        </div>
        <SignUp
          appearance={{
            theme: theme === "dark" ? shadcn : undefined,
            elements: {
              rootBox: "w-full mx-auto",
              card: "shadow-lg border-0 bg-blue-500",
            },
          }}
        />
      </div>
    </div>
  );
}
