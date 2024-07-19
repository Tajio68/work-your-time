import Body from "./components/Body";

export default function Home() {
  return (
    <main className="flex min-h-max md:min-h-[1000px] lg:min-h-screen flex-col lg:justify-center lg:flex-row">
      {<Body />}
    </main>
  );
}
