import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Únete a <span className="text-blue-600">PlotForge</span>
          </h1>
          <p className="text-gray-600">
            Crea tu cuenta y comienza a escribir historias interactivas
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-lg border-0",
            },
          }}
        />
      </div>
    </div>
  );
}
