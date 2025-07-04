import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../../Hooks/UseAuth";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const BeARider = () => {
  const locations = useLoaderData();
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();
  const [region, setRegion] = useState("");

  // Get unique regions
  const regions = [...new Set(locations.map((item) => item.region))];

  // Get districts based on selected region
  const districts = locations
    .filter((item) => item.region === region)
    .map((item) => item.district);

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      name: user?.displayName || "Anonymous",
      email: user?.email || "N/A",
      status: "pending",
      created_at: new Date().toISOString(),
    };

    axiosSecure.post("/riders", riderData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Drag me!",
          icon: "success",
          draggable: true,
        });
        console.log("🚀 Rider Application Data:", riderData);
        reset();
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        🚴 Be a Rider
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="font-medium text-primary">Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full input input-bordered mt-1"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-medium text-primary">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full input input-bordered mt-1"
          />
        </div>

        {/* Age */}
        <div>
          <label className="font-medium text-primary">Age</label>
          <input
            type="number"
            {...register("age", { required: "Age is required" })}
            className="w-full input input-bordered mt-1"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        {/* National ID */}
        <div>
          <label className="font-medium text-primary">National ID</label>
          <input
            type="text"
            {...register("nid", { required: "NID is required" })}
            className="w-full input input-bordered mt-1"
          />
          {errors.nid && (
            <p className="text-red-500 text-sm">{errors.nid.message}</p>
          )}
        </div>

        {/* Contact */}
        <div>
          <label className="font-medium text-primary">Contact Number</label>
          <input
            type="tel"
            {...register("contact", { required: "Contact number is required" })}
            className="w-full input input-bordered mt-1"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm">{errors.contact.message}</p>
          )}
        </div>

        {/* Region */}
        <div>
          <label className="font-medium text-primary">Region</label>
          <select
            {...register("region", { required: "Region is required" })}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full select select-bordered mt-1"
          >
            <option value="">Select Region</option>
            {regions.map((regionName, i) => (
              <option key={i} value={regionName}>
                {regionName}
              </option>
            ))}
          </select>
          {errors.region && (
            <p className="text-red-500 text-sm">{errors.region.message}</p>
          )}
        </div>

        {/* District */}
        <div>
          <label className="font-medium text-primary">District</label>
          <select
            {...register("district", { required: "District is required" })}
            className="w-full select select-bordered mt-1"
          >
            <option value="">Select District</option>
            {districts.map((district, i) => (
              <option key={i} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-red-500 text-sm">{errors.district.message}</p>
          )}
        </div>

        {/* Bike Brand */}
        <div>
          <label className="font-medium text-primary">Bike Brand</label>
          <input
            type="text"
            {...register("bike_brand", { required: "Bike brand is required" })}
            className="w-full input input-bordered mt-1"
          />
          {errors.bike_brand && (
            <p className="text-red-500 text-sm">{errors.bike_brand.message}</p>
          )}
        </div>

        {/* Bike Registration */}
        <div>
          <label className="font-medium text-primary">
            Bike Registration Number
          </label>
          <input
            type="text"
            {...register("bike_registration", {
              required: "Registration is required",
            })}
            className="w-full input input-bordered mt-1"
          />
          {errors.bike_registration && (
            <p className="text-red-500 text-sm">
              {errors.bike_registration.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button className="btn btn-success px-10 mt-4" type="submit">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeARider;
