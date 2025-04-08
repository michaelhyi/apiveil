import AuthContainer from "@/components/AuthContainer";
import Input from "@/components/Input";
import OAuthButton from "@/components/OAuthButton";
import Link from "next/link";

export default function Register() {
  return (
    <AuthContainer>
      <Input id="name" label="Name" type="text" required />
      <Input id="email" label="Email" type="text" required className="mt-2" />
      <Input
        id="password"
        label="Password"
        type="password"
        required
        className="mt-2"
      />
      <Input
        id="confirm-password"
        label="Confirm Password"
        type="password"
        required
        className="mt-2"
      />

      <button type="submit" className="bg-white text-black py-3 mt-8 text-sm">
        Register
      </button>

      <OAuthButton
        src="/assets/google-icon.svg"
        alt="google-icon"
        provider="Google"
      />
      <OAuthButton
        src="/assets/github-icon.svg"
        alt="github-icon"
        provider="GitHub"
      />

      <p className="text-xs text-[#9D9D9D] text-center mt-4">
        Already have an account?&nbsp;
        <Link href="/" className="underline">
          Login
        </Link>
      </p>
    </AuthContainer>
  );
}
