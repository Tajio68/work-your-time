"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Skeleton } from "./skeleton";

const AuthButton = () => {
  const { status } = useSession();
  const route = useRouter();
  if (status === "unauthenticated") {
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
  } else if (status === "loading") {
    return <Skeleton className="w-[8%] h-12" />;
  }
  return (
    <Popover>
      <PopoverTrigger className="bg-slate-100 text-black border-2 border-slate-100 text-xl p-5 rounded-md duration-200 hover:text-white hover:bg-purple-500">
        Profile
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
          onClick={() => signOut()}
          className="bg-purple-500 border-2 border-purple-500 hover:text-purple-500 hover:bg-slate-100"
        >
          Log Out
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default AuthButton;
