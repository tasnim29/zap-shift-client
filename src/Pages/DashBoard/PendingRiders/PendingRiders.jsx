import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../Shared/Loader/Loader";

const PendingRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  const {
    isPending,
    data: riders = [],
    refetch,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  if (isPending) {
    return Loader;
  }

  const handleStatusChange = async (id, newStatus, email) => {
    try {
      const res = await axiosSecure.patch(`/riders/${id}`, {
        status: newStatus,
        email,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire(`Rider ${newStatus}`, "", "success");
        setSelectedRider(null);
        refetch();
      }
    } catch (err) {
      console.error("Status change failed:", err);
      Swal.fire("Error", "Could not update status", "error");
    }
  };

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-primary">
        📋 Pending Riders
      </h2>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>District</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider) => (
            <tr key={rider._id}>
              <td>{rider.name}</td>
              <td>{rider.email}</td>
              <td>{rider.region}</td>
              <td>{rider.district}</td>
              <td>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => setSelectedRider(rider)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedRider && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white text-black font-semibold p-6 rounded-xl w-full max-w-md space-y-4 relative">
            <button
              className="absolute top-2 right-2 btn btn-xs btn-circle btn-error"
              onClick={() => setSelectedRider(null)}
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-2 text-primary">
              Rider Details
            </h3>
            <p>
              <strong>Name:</strong> {selectedRider.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedRider.email}
            </p>
            <p>
              <strong>Age:</strong> {selectedRider.age}
            </p>
            <p>
              <strong>Contact:</strong> {selectedRider.contact}
            </p>
            <p>
              <strong>Region:</strong> {selectedRider.region}
            </p>
            <p>
              <strong>District:</strong> {selectedRider.district}
            </p>
            <p>
              <strong>Bike Brand:</strong> {selectedRider.bike_brand}
            </p>
            <p>
              <strong>Registration:</strong> {selectedRider.bike_registration}
            </p>
            <p>
              <strong>NID:</strong> {selectedRider.nid}
            </p>

            <div className="flex gap-4 mt-4">
              <button
                className="btn btn-success"
                onClick={() =>
                  handleStatusChange(
                    selectedRider._id,
                    "approved",
                    selectedRider.email
                  )
                }
              >
                Approve
              </button>
              <button
                className="btn btn-error"
                onClick={() =>
                  handleStatusChange(
                    selectedRider._id,
                    "canceled",
                    selectedRider.email
                  )
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
