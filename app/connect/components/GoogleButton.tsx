"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  return (
    <Button
      className="text-xs tab:text-xl w-2/3 pc:w-1/3 self-center bg-white text-purple-500 border-2 border-purple-600 hover:shadow-lg hover:shadow-purple-500 hover:bg-white"
      type="submit"
      onClick={() => signIn("google")}
    >
      <p className="tab:text-lg">Sign in with Google</p>
      <FcGoogle className="ml-4" />
    </Button>
  );
};

export default GoogleButton;
