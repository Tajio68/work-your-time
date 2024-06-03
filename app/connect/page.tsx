import Link from "next/link";
import ConnectForm from "./components/ConnectForm";
import GoogleButton from "./components/GoogleButton";

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
        <GoogleButton />
      </div>
    </div>
  );
};

export default page;
