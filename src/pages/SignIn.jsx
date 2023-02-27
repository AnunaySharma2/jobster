import React from "react";
import { NavLink } from "react-router-dom";

function SignIn() {
  return (
    <div className="flex flex-col justify-center h-screen bg-background-300">
      <h1 className="text-5xl font-semibold text-lightwhite-100 mx-4 my-3">
        Sign In
      </h1>
      <h2 className="text-xl text-lightwhite-100 mx-4 my-2">
        Find latest suitable jobs for you 😎
      </h2>
      <form className="flex flex-col justify-center my-1">
        <input
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          className="bg-background-200 mx-4 my-2 p-3 rounded-md w-3/4"
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          className="bg-background-200 mx-4 my-2 p-3 rounded-md w-3/4"
        />
        <NavLink to="/signup" className={"mx-4 my-1 text-lightwhite-100 font-light"}>
          Don't have an account?
        </NavLink>
        <button
          type="button"
          className="bg-blue-400 font-medium w-fit p-3 rounded-md mx-4 my-3"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
