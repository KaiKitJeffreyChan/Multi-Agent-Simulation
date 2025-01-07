import React from "react";
import { useRouter } from "next/router";

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-primary h-screen flex items-center sm:p-48 p-12 font-shareTechMono">
      <div className="flex flex-col text-secHighlight text-lg cursor-pointer">
        <h1 onClick={() => router.push("/SimDetails")} className="button">
          Create Simulation{" "}
        </h1>

        <h1 onClick={() => router.push("/Info")} className="button">
          What Is This{" "}
        </h1>
      </div>
    </div>
  );
};

export default Home;
