import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center h-screen bg-background-300">
      <h1 className="text-5xl font-semibold text-lightwhite-100 mx-4 my-3">
        Register
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
          onChange={emailHandler}
          className="bg-background-200 text-lightwhite-100 mx-4 my-2 p-3 rounded-md w-3/4"
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          onChange={passwordHandler}
          className="bg-background-200 text-lightwhite-100 mx-4 my-2 p-3 rounded-md w-3/4"
        />
        <NavLink to="/" className={"mx-4 my-1 text-lightwhite-100"}>
          Already have an account?
        </NavLink>
        <button
          type="button"
          className="bg-blue-400 font-medium w-fit p-3 rounded-md mx-4 my-3 hover:scale-110 hover:ease-in-out"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
