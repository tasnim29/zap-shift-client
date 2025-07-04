import React from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  // console.log(parcels);
  const formatDate = (iso) => {
    return new Date(iso).toLocaleString(); // Format: "6/22/2025, 3:11:31 AM"
  };

  // view
  const handleView = (id) => {
    console.log("view the parcel", id);
  };

  // payment
  const handlePay = (id) => {
    console.log("proceed too payment for", id);
    navigate(`/dashBoard/payment/${id}`);
  };

  // delete
  const handleDelete = (parcelId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/parcels/${parcelId}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Parcel has been deleted.", "success");
              // Refetch or update cache
              refetch();
            }
          })
          .catch((err) => {
            Swal.fire("Error!", "Something went wrong.", "error");
            console.error(err);
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-xl">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-base font-semibold">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td className="max-w-[180px] truncate">{parcel.parcel_name}</td>
              <td className="capitalize">{parcel.type}</td>
              <td>{formatDate(parcel.creation_date)}</td>
              <td>৳{parcel.totalCost}</td>
              <td>
                <span
                  className={`badge ${
                    parcel.payment_status === "paid"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {parcel.payment_status}
                </span>
              </td>
              <td className="space-x-2">
                <button
                  onClick={() => handleView(parcel._id)}
                  className="btn btn-xs btn-outline"
                >
                  View
                </button>
                {parcel.payment_status === "unpaid" && (
                  <button
                    onClick={() => handlePay(parcel._id)}
                    className="btn btn-xs btn-primary text-black"
                  >
                    Pay
                  </button>
                )}
                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {parcels.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-6">
                No parcels found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
