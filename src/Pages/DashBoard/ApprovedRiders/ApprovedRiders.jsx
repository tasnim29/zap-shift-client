import React, { useState } from "react";

import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaSearch, FaUserCheck, FaUserTimes } from "react-icons/fa";
import Loader from "../../Shared/Loader/Loader";

const ApprovedRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch approved riders
  const {
    data: riders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["approvedRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/approved");
      return res.data;
    },
  });

  // Handle de-approve
  const handleDeapprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This rider will be marked as pending again.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, de-approve",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/riders/${id}`, { status: "canceled" });
      refetch();
      Swal.fire("Updated!", "Rider status changed to pending.", "success");
    }
  };

  // Filter by name
  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-2">
        <FaUserCheck className="text-green-500" /> Approved Riders
      </h2>

      {/* Search Box */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-sm"
        />
        <FaSearch className="text-xl text-gray-500" />
      </div>

      {/* Table */}
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-xl">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Region</th>
                <th>District</th>
                <th>Bike Brand</th>
                <th>Registration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.contact}</td>
                  <td>{rider.region}</td>
                  <td>{rider.district}</td>
                  <td>{rider.bike_brand}</td>
                  <td>{rider.bike_registration}</td>
                  <td>
                    <button
                      onClick={() => handleDeapprove(rider._id)}
                      className="btn btn-sm btn-error"
                    >
                      <FaUserTimes className="mr-1" /> De-Approve
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRiders.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center text-gray-500">
                    No approved riders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApprovedRiders;
