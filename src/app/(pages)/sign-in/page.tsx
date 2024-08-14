import SignInForm from "@/components/forms/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignIn",
};

const SignIn = () => {
  return <SignInForm />;
};

export default SignIn;
