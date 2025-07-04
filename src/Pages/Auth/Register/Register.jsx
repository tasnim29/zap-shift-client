import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../../Hooks/UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import UseAxios from "../../../Hooks/UseAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const [profilePic, setProfilePic] = useState("");

  const { createUser, updateUser } = UseAuth();
  const axiosInstance = UseAxios();

  const onsubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(async (userCredential) => {
        // update profile in database
        const userInfo = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };
        const res = await axiosInstance.post("/users", userInfo);
        console.log("userInfo saved to mongoDB", res.data);

        // update user profile in firebase
        const profileInfo = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUser(profileInfo)
          .then(() => {
            console.log("profile updated successfully");
            navigate(from);
          })
          .catch((error) => {
            console.log(error);
          });

        console.log("from register component", userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_UPLOAD_KEY
      }`,
      formData
    );
    // console.log(res.data.data.url);
    setProfilePic(res.data.data.url);
  };
  return (
    <div className="hero ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {" "}
        <fieldset className="fieldset">
          <form onSubmit={handleSubmit(onsubmit)}>
            <h1 className="text-5xl font-bold">Create an Account</h1>
            <p className="my-5">Register with ProFast</p>
            {/* name */}
            <label className="label">Name</label>
            <input
              type="text"
              className="input w-full"
              {...register("name", { required: true })}
              placeholder="enter your fullname"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">name is required</p>
            )}

            {/* image  */}
            <label className="label">Image</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="input w-full"
              placeholder="enter profile image"
            />

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
