"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Dashboard from "./Dashboard";

const Body = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <Dashboard />
      </>
    );
  } else if (status === "unauthenticated") {
    return (
      <>
        <div className="flex flex-col items-center justify-center space-y-10 lg:space-y-32 bg-purple-500 lg:bg-gradient-to-b lg:from-purple-500 lg:to-white w-full lg:w-3/5 p-20 md:h-[500px] lg:h-[800px]">
          <h2 className="text-5xl font-extrabold text-center">
            Welcome to <span className="colorTitle">Work Your Time</span> !
          </h2>
          <p className="text-3xl text-center">Measure your time of work !</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-8 md:space-y-14 bg-gradient-to-b from-purple-500 to-white w-full lg:w-2/5 p-20 md:h-[500px] lg:h-[800px]">
          <div className="flex-col">
            <Button className="text-4xl p-10 bg-purple-700 hover:bg-slate-100 text-white hover:text-black">
              <Link href={"/connect/register"}>Try Now !</Link>
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center space-y-5">
            <h3 className="text-lg font-semibold">Already have an account ?</h3>
            <Button className="text-2xl p-6 bg-slate-100 hover:bg-purple-700 text-black hover:text-white">
              <Link href={"/connect"}>Sign In</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Skeleton />
    </>
  );
};

export default Body;
