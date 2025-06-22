import React, { useState } from "react";
import BangladeshMap from "./BangladeshMap ";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const districtData = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  //   console.log(districtData);
  return (
    <div className="min-h-screen bg-base-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        We are available in 64 districts
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search district..."
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-full max-w-6xl mx-auto rounded-lg overflow-hidden shadow-lg">
        <BangladeshMap districtData={districtData} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Coverage;
