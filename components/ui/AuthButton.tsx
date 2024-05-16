"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface Props {
  text: string;
}

const AuthButton = ({ text }: Props) => {
  const route = useRouter();
  if (text === "Log n") {
    return (
      <Button
        onClick={() => {
          route.push("/connect");
        }}
        className="bg-slate-100 text-black border-2 border-slate-100 text-xl p-7 hover:text-white hover:bg-purple-500"
      >
        Log In
      </Button>
    );
  }
  return (
    <Popover className="p-7">
      <PopoverTrigger className="">
        <Button
          onClick={() => {
            console.log("Account");
          }}
          className="bg-slate-100 text-black border-2 border-slate-100 text-xl p-7 hover:text-white hover:bg-purple-500"
        >
          Profile
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col justify-center space-y-5">
        <Link href={"/profile"} className="text-center">
          Profile
        </Link>
        <hr className="w-5/6 self-center" />
        <Link href={"/parameters"} className="text-center">
          Settings
        </Link>
        <hr className="w-5/6 self-center" />
        <Button
          onClick={() => {
            text === "Log In" ? console.log("LogIN") : route.push("/");
          }}
          className="bg-purple-500 border-2 border-purple-500 hover:text-purple-500 hover:bg-slate-100"
        >
          Log Out
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default AuthButton;
