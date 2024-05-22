import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col w-[100%] items-center justify-around space-y-5 p-4 bg-purple-600 text-neutral-100 text-lg tab:flex-row tab:space-y-0">
      <p>
        Coded by{" "}
        <Link
          href={"https://timeo-godin.fr"}
          className="footerLink"
          target="_blank"
        >
          Timéo GODIN
        </Link>
      </p>
      <p>Work Your Time 2024</p>
      <p className="footerLink">
        <Link href="/legals">Legals</Link>
      </p>
    </footer>
  );
};

export default Footer;
