import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import ConnectForm from "./components/ConnectForm";

export const page = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="flex flex-col m-4 w-5/6 pc:w-1/2 pc:m-8 p-8 border-2 border-slate-400 rounded-xl items-center space-y-4">
        <ConnectForm mode="LOGIN" />
        <Link
          className="mt-2 font-bold text-purple-500 hover:text-purple-700 hover:underline"
          href="/connect/register"
        >
          Or register
        </Link>
        <hr className="w-2/3 mt-8 mb-8" />
        <h2 className=" tab:text-xl">Other authentification method</h2>
        <Button
          className="text-xs tab:text-xl w-2/3 pc:w-1/3 self-center bg-white text-purple-500 border-2 border-purple-600 hover:shadow-lg hover:shadow-purple-500 hover:bg-white"
          type="submit"
        >
          <p className="tab:text-lg">Sign in with Google</p>
          <FcGoogle className="ml-4" />
        </Button>
      </div>
    </div>
  );
};

export default page;
