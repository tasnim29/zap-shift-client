import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="hero  ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <fieldset className="fieldset">
          <form onSubmit={handleSubmit(onsubmit)}>
            <h1 className="text-5xl font-bold">Welcome Back !!!</h1>
            <p className="my-5">Login with ProFast</p>
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              {...register("email")}
              placeholder="Email"
            />

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
              <p className="text-red-500">
                The password must be 6 or more characters
              </p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="btn btn-primary text-black mt-4 w-full"
            >
              Login
            </button>
            <p>
              Don’t have any account?
              <Link className="btn btn-link" to="/register">
                Register
              </Link>
            </p>
          </form>
          <SocialLogin></SocialLogin>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
