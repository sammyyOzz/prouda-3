import { RegisterForm } from "@/components/auth/register-form";

export const metadata = {
  title: "Create Account - Prouda Tutors",
  description: "Create a new Prouda Tutors account",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <RegisterForm />
    </div>
  );
}
