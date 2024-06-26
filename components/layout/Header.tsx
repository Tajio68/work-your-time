import Link from "next/link";
import AuthButton from "../ui/AuthButton";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-around h-32 bg-purple-500">
      <h1 className="text-2xl tab:text-5xl  text-neutral-100 select-none">
        <Link href="/">Work your time !</Link>
      </h1>
      <AuthButton />
    </header>
  );
};

export default Header;
