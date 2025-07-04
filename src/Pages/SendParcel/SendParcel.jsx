import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseTrackinglogger from "../../Hooks/UseTrackinglogger";

const generateTrackingID = () => {
  const date = new Date();
  const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PCL-${datePart}-${rand}`;
};

const SendParcel = () => {
  const { user } = UseAuth();
  const regionData = useLoaderData();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const { logTracking } = UseTrackinglogger();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const parcelType = watch("type");
  const senderRegion = watch("sender_region");
  const receiverRegion = watch("receiver_region");

  const regions = useMemo(() => {
    const unique = [...new Set(regionData.map((item) => item.region))];
    return unique;
  }, [regionData]);

  const getDistricts = (region) => {
    return regionData
      .filter((item) => item.region === region)
      .map((item) => item.district);
  };

  const calculateCost = (data) => {
    const weight = parseFloat(data.weight) || 0;
    const isSameCity = data.sender_region === data.receiver_region;
    let breakdown = "";
    let total = 0;

    if (data.type === "document") {
      total = isSameCity ? 60 : 80;
      breakdown = `Base (Document): ৳${total}`;
    } else if (data.type === "non-document") {
      if (weight <= 3) {
        total = isSameCity ? 110 : 150;
        breakdown = `Base (≤3kg Non-Document): ৳${total}`;
      } else {
        const extraKg = weight - 3;
        const base = isSameCity ? 110 : 150;
        const perKgCharge = extraKg * 40;
        const extraCharge = isSameCity ? 0 : 40;
        total = base + perKgCharge + extraCharge;
        breakdown = `Base (3kg): ৳${base} + Extra (${extraKg}kg × 40): ৳${perKgCharge} ${
          extraCharge ? `+ Outside Region Charge: ৳${extraCharge}` : ""
        }`;
      }
    }

    return { total, breakdown };
  };

  const onSubmit = (data) => {
    const { total } = calculateCost(data);

    Swal.fire({
      title: "Confirm Your Parcel",
      html: `
    <div style="text-align: left; font-size: 15px; line-height: 1.7">
      <p><strong>Parcel Type:</strong> ${
        data.type === "document" ? "Document" : "Non-Document"
      }</p>
      ${
        data.type === "non-document"
          ? `<p><strong>Weight:</strong> ${data.weight} kg</p>`
          : `<p><strong>Weight:</strong> Not applicable for document</p>`
      }
      <p><strong>Delivery Zone:</strong> ${
        data.sender_region === data.receiver_region
          ? "Within Same City/Region"
          : "Outside City/District"
      }</p>
      <p><strong>Base Cost:</strong> ৳${
        data.type === "document"
          ? data.sender_region === data.receiver_region
            ? 60
            : 80
          : data.sender_region === data.receiver_region
          ? 110
          : 150
      }</p>

      ${
        data.type === "non-document" && parseFloat(data.weight) > 3
          ? `
        <p><strong>Extra Charges:</strong></p>
        <ul style="padding-left: 18px; margin: 0;">
          <li>৳40 × ${(parseFloat(data.weight) - 3).toFixed(
            2
          )} kg overweight = ৳${((parseFloat(data.weight) - 3) * 40).toFixed(
              0
            )}</li>
          ${
            data.sender_region !== data.receiver_region
              ? "<li>৳40 extra for Outside City/District</li>"
              : ""
          }
        </ul>
      `
          : ""
      }

      <hr style="border-top: 1px dotted #999; margin: 12px 0;" />
      <p style="font-size: 18px; color: #10b981; font-weight: bold">
        Total Cost: ৳${total}
      </p>
    </div>
  `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm & Save",
      cancelButtonText: "Continue Editing",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#3b82f6",
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm(total); // pass total here
      }
    });
  };

  const onConfirm = (total) => {
    const tracking_id = generateTrackingID();
    const parcelData = {
      ...watch(),
      totalCost: total,
      created_by: user?.email || "anonymous",
      payment_status: "unpaid",
      delivery_status: "not_collected",
      creation_date: new Date().toISOString(),
      tracking_id: tracking_id,
    };
    console.log("Parcel Saved:", parcelData);

    // save the parcelData to the server
    axiosSecure.post("/parcels", parcelData).then(async (res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Redirecting...",
          text: "Proceeding to payment gateway.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        await logTracking({
          tracking_id: parcelData.tracking_id,
          status: "parcel_created",
          details: `Created by ${user.displayName}`,
          updated_by: user.email,
        });

        navigate("/dashBoard/myParcels");
      }
    });

    // toast.success("Parcel info saved successfully!");
    reset();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Toaster />
      <h1 className="text-3xl font-bold text-left text-gray-800">
        Send a Parcel
      </h1>
      <p className="text-lg mb-6 text-left text-gray-600">
        Fill in the information to schedule your delivery
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-base-100 p-6 rounded-xl shadow"
      >
        {/* === Parcel Info === */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Parcel Info</h2>

          {/* Parcel Type - full width on top */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text font-semibold">Parcel Type:</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  {...register("type", { required: true })}
                  type="radio"
                  value="document"
                  className="radio"
                />
                <span>Document</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  {...register("type", { required: true })}
                  type="radio"
                  value="non-document"
                  className="radio"
                />
                <span>Non-Document</span>
              </label>
            </div>
            {errors.type && (
              <p className="text-sm text-red-500 mt-1">
                Please select a parcel type
              </p>
            )}
          </div>

          {/* Parcel Name & Weight side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Parcel Name */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Parcel Name:</span>
              </label>
              <input
                {...register("parcel_name", { required: true })}
                type="text"
                placeholder="Enter Parcel Name"
                className="input input-bordered w-full"
              />
              {errors.parcel_name && (
                <p className="text-sm text-red-500 mt-1">
                  Parcel name is required
                </p>
              )}
            </div>

            {/* Parcel Weight */}
            {parcelType === "non-document" && (
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Parcel Weight (kg):
                  </span>
                </label>
                <input
                  {...register("weight")}
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1.5"
                  className="input input-bordered w-full"
                />
              </div>
            )}
          </div>
        </div>

        <hr className="border-t-2 border-dotted border-gray-400 w-full my-8" />

        {/* === Sender & Receiver Info === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Sender Info</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Sender Name:</span>
                </label>
                <input
                  {...register("sender_name", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Sender Name"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Contact Number:
                  </span>
                </label>
                <input
                  {...register("sender_contact", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Contact Number"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Your Region:</span>
                </label>
                <select
                  {...register("sender_region", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Your Region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Service Center:
                  </span>
                </label>
                <select
                  {...register("sender_service_center", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Service Center</option>
                  {getDistricts(senderRegion).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Pickup Address:
                  </span>
                </label>
                <input
                  {...register("sender_address", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Pickup Address"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Pickup Instruction:
                  </span>
                </label>
                <textarea
                  {...register("pickup_instruction", { required: true })}
                  className="textarea textarea-bordered w-full"
                  placeholder="Pickup Instruction"
                />
              </div>
            </div>
          </div>

          {/* Receiver Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Receiver Info</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Receiver Name:
                  </span>
                </label>
                <input
                  {...register("receiver_name", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Receiver Name"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Contact Number:
                  </span>
                </label>
                <input
                  {...register("receiver_contact", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Contact Number"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Select Type:</span>
                </label>
                <select
                  {...register("receiver_region", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Type</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Service Center:
                  </span>
                </label>
                <select
                  {...register("receiver_service_center", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Service Center</option>
                  {getDistricts(receiverRegion).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Delivery Address:
                  </span>
                </label>
                <input
                  {...register("receiver_address", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Delivery Address"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Delivery Instruction:
                  </span>
                </label>
                <textarea
                  {...register("delivery_instruction", { required: true })}
                  className="textarea textarea-bordered w-full"
                  placeholder="Delivery Instruction"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-right">
          <button className="btn btn-primary text-black" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
