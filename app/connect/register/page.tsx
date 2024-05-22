import ConnectForm from "../components/ConnectForm";

const page = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-5/6 tab:1/2 pc:w-1/2 m-8 p-8 border-2 border-slate-400 rounded-xl items-center">
        <ConnectForm mode="REGISTER" />
      </div>
    </div>
  );
};

export default page;
