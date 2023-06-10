/* export let userID: string; */

import Featured from "@/components/dashboard/Featured";
import Upcoming from "@/components/dashboard/Upcoming";

function Home() {
  return (
    <div className="text-white">
      <div>
        <Featured />
        <Upcoming />
      </div>
    </div>
  );
}

export default Home;
