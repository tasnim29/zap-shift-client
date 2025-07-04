import React from "react";
import UseAuth from "../../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../Shared/Loader/Loader";

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  const formatDate = (iso) => new Date(iso).toLocaleString();
  if (isPending) {
    return Loader;
  }
  return (
    <div className="overflow-x-auto shadow-xl rounded-2xl p-4 ">
      <h2 className="text-xl text-primary font-bold mb-4">
        My Payment History
      </h2>
      <table className="table w-full table-zebra">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Parcel ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Transaction ID</th>
            <th>Paid At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, idx) => (
            <tr key={payment._id}>
              <td>{idx + 1}</td>
              <td className="text-sm text-gray-600">{payment.parcelId}</td>
              <td className="font-medium text-green-600">৳{payment.amount}</td>
              <td className="capitalize">{payment.paymentMethod?.[0]}</td>
              <td className="text-xs break-all">{payment.transactionId}</td>
              <td>{formatDate(payment.paid_at)}</td>
            </tr>
          ))}
          {payments.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No payment history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
