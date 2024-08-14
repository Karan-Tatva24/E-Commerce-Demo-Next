import SignUpForm from "@/components/forms/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp",
};

const SignUp = () => {
  return <SignUpForm />;
};

export default SignUp;
