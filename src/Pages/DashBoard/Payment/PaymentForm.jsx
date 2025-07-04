import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Shared/Loader/Loader";
import { useNavigate, useParams } from "react-router";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import UseTrackinglogger from "../../../Hooks/UseTrackinglogger";

const PaymentForm = () => {
  const navigate = useNavigate();
  const { user } = UseAuth();
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();

  const [error, setError] = useState();
  const axiosSecure = UseAxiosSecure();
  const { logTracking } = UseTrackinglogger();

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  if (isPending) {
    return <Loader></Loader>;
  }
  console.log(parcelInfo);
  const amount = parcelInfo.totalCost;
  const amountInCents = amount * 100;
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    //step:1 validate the card(means info of the card is valid or not)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.log("error", error);
    } else {
      setError("");
      console.log("payment method", paymentMethod);

      //step:2 create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        parcelId,
      });
      const clientSecret = res.data.clientSecret;

      // step:3 confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
      if (result.error) {
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment succeeded!");
          const transactionId = result.paymentIntent.id;

          // step:4 mark parcel payment paid and also create history of payments
          const paymentData = {
            parcelId,
            email: user.email,
            amount,
            transactionId: transactionId,
            paymentMethod: result.paymentIntent.payment_method_types,
          };
          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
            console.log("payment added successfully");
            Swal.fire({
              title: "Payment Successful",
              html: `<p>Your Transaction ID:</p><strong>${transactionId}</strong>`,
              icon: "success",
            });

            await logTracking({
              tracking_id: parcelInfo.tracking_id,
              status: "payment_done",
              details: `Created by ${user.displayName}`,
              updated_by: user.email,
            });
            // navigate to myParcels route
            navigate("/dashBoard/myParcels");
          }
        }
      }
    }

    // console.log(res.data);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mx-auto max-w-md shadow-xl w-full bg-white mt-5 rounded-2xl p-6"
      >
        <CardElement className="p-2 mb-4"></CardElement>
        <button
          className="btn btn-primary w-full text-black"
          type="submit"
          disabled={!stripe}
        >
          Pay tk{amount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
