import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../../Hooks/UseAuth";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = UseAuth();

  const onsubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((userCredential) => {
        console.log("from register component", userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="hero ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {" "}
        <fieldset className="fieldset">
          <form onSubmit={handleSubmit(onsubmit)}>
            <h1 className="text-5xl font-bold">Create an Account</h1>
            <p className="my-5">Register with ProFast</p>
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Password must be 6 or more</p>
            )}

            <button
              type="submit"
              className="btn btn-primary text-black mt-4 w-full"
            >
              Register
            </button>
            <p>
              Don’t have any account?
              <Link className="btn btn-link" to="/login">
                Log in
              </Link>
            </p>
          </form>
          <SocialLogin></SocialLogin>
        </fieldset>
      </div>
    </div>
  );
};

export default Register;
