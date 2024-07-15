import { Button } from "@/components/ui/button";
import Goal from "../user/[userId]/profile/components/Goal";
import Sessions from "../user/[userId]/profile/components/Sessions";

const sessionRun = true;

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center lg:items-stretch lg:flex-row w-full mr-6">
      <div className="flex flex-col w-full lg:w-1/2 items-center border-2 border-purple-400 bg-slate-100 m-6 rounded-lg space-y-5 pb-6">
        <h1 className="text-3xl p-5">
          {sessionRun ? "Current session :" : "No session is running"}
        </h1>
        <div className="flex flex-col items-center justify-center h-4/5">
          {sessionRun ? (
            <>
              <p className="text-xl md:text-2xl">Starting time :</p>
            </>
          ) : (
            <></>
          )}
          <Button className="m-10 text-3xl p-10 bg-purple-600 hover:bg-purple-800">
            {sessionRun ? "Stop session" : "Start a session"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-around">
        <div className="border-2 border-purple-400 bg-slate-100 w-full h-1/2 m-6 items-center justify-center rounded-lg">
          <h2 className="text-2xl text-center p-8">Goal</h2>
          <Goal />
        </div>
        <div className=" border-2 border-purple-400 bg-slate-100 w-full h-1/2 mr-6 mb-6 ml-6 rounded-lg">
          <h2 className="text-2xl text-center p-5">Sessions</h2>
          <Sessions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
