
import Featured from "@/components/dashboard/Featured";
import Upcoming from "@/components/dashboard/Upcoming";
import { getMyLib, getWishlist } from "@/utils/appwrite";
import { useEffect } from "react";

function Home() {

  return (
    <main className="text-white">
      <section className="">
        <Featured />
      </section>
      <section className="">
        <Upcoming />
      </section>
      <section></section>
    </main>
  );
}

export default Home;
