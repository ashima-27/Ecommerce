// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
// 	checkUserAsync, selectError, selectLoggedInUser
 
// } from '../authSlice';
// import '../auth.css';
// import {Link, Navigate} from 'react-router-dom';
// import { useForm } from "react-hook-form";
// export default function Login() {
// 	const {
// 		register,
// 		handleSubmit,
// 		watch,
// 		formState: { errors },
// 	  } = useForm();
//   const error = useSelector(selectError);
//   const user =useSelector(selectLoggedInUser)
//   const dispatch = useDispatch();
 
//   return (
//     <>
//   {user && <Navigate to="/login" ></Navigate>}
// <div class="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
// 	<form class="flex flex-col bg-white rounded shadow-lg p-12 mt-12"  onSubmit={handleSubmit((data) => {
// 		 dispatch(
//                checkUserAsync({ email: data.email, password: data.password })
//               );
//             console.log(data);
//                      })}>
// 		<label class="font-semibold text-xs" for="usernameField">Username or Email</label>
// 		<input class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="email" id="email"    {...register(
//               "email",
//               { required: 'Email is' },
//               {
//                 pattern: {
//                   value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
//                   message: "email is not valid",
//                 },
//               }
//             )}/>
// 			  {errors?.email && (
//             <p className="text-red-500">{errors.email.message}</p>
//           )}
// 		<label class="font-semibold text-xs mt-3" for="passwordField">Password</label>
// 		<input class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="password" id="password"
//             {...register(
//               "password",
//               { required: "Password is required" },
//               {
//                 pattern: {
//                   value:
//                     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
//                   message: `- at least 8 characters\n
//                       - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
//                       - Can contain special characters`,
//                 },
//               }
//             )}/>
// 			 {error && (
//             <p className="text-red-500">{error.message}</p>
//           )}
// 		<button class="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700" >Login</button>
// 		<div class="flex mt-6 justify-center text-xs">
// 			<a class="text-blue-400 hover:text-blue-500" href="#">Forgot Password</a>
// 			<span class="mx-2 text-gray-300">/</span>
// 			<Link to="/signup" class="text-blue-400 hover:text-blue-500" href="#">Create an account</Link>
// 		</div>
// 	</form>
	

// </div>
//     </>


//   );
// }


import { useSelector, useDispatch } from 'react-redux';
import { selectError, selectLoggedInUser } from '../authSlice';
import { Link, Navigate } from 'react-router-dom';
import { checkUserAsync } from '../authSlice';
import { useForm } from 'react-hook-form';

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="w-auto h-10 mx-auto"
            src="/ecommerce.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
               checkUserAsync({ email: data.email, password: data.password })
              );
            })}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email', {
                    required: 'email is required',
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: 'email not valid',
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register('password', {
                    required: 'password is required',
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              {/* {error && <p className="text-red-500">{error || error.message}</p>} */}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-10 text-sm text-center text-gray-500">
            Not a member?{' '}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}