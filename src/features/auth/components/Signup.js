import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {createUserAsync,selectLoggedInUser} from "../authSlice";
import "../auth.css";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(errors);
  const user  = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  return (
    <>
     {user && <Navigate to="/" replace={true}></Navigate>}
     <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Create a New Account
          </h2>
      <div class="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
        <form noValidate
          class="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
          onSubmit={handleSubmit((data) => {
            console.log(data);
            dispatch(createUserAsync({email:data.email ,password:data.password,addresses:[],role:'user'}))
            // dispatch(createUserAsync(data))
          })}
        >
          <label class="font-semibold text-xs" for="usernameField">
            Username or Email
          </label>
          <input
            class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="email"
            id="email"
            {...register(
              "email",
              { required: 'Email is' },
              {
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: "email is not valid",
                },
              }
            )}
          />
          {errors?.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <label class="font-semibold text-xs mt-3" for="passwordField">
            Password
          </label>
          <input
            class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="password"
            id="password"
            {...register(
              "password",
              { required: "Password is required" },
              {
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                },
              }
            )}
          />
          {errors?.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <label class="font-semibold text-xs mt-3" for="passwordField">
            Confirm Password
          </label>
          <input
            class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="password"
            id="confirmPassword"
            {...register(
              "confirmPassword",
              { required: "Confirm Password is required" },
              {
                validate: (value, formValues) =>
                  value === formValues.password || "password not matching",
              }
            )}
          />
          {errors?.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          <button class="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">
            Sign up
          </button>

          <div class="flex mt-6 justify-center text-xs">
            <Link
              to="/login"
              class="text-blue-400 hover:text-blue-500"
              href="#"
            >
              Already a member
            </Link>
            <span class="mx-2 text-gray-300">/</span>
            <Link
              to="/login "
              class="text-blue-400 hover:text-blue-500"
              href="#"
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
