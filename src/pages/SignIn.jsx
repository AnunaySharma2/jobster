import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const signInHandler = () => {
    async function signInWithEmail() {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (error) throw error;
        toast({
          title: "Signed in! 🙌",
          status: "success",
          duration: 2000,
          isClosable: false,
        });
        navigate("/jobs");
      } catch (error) {
        toast({
          title: "Error 🤔",
          description: `${error}`,
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      }
    }
    signInWithEmail();
  };

  return (
    <div className="flex flex-col justify-center h-screen p-5">
      <h1 className="text-5xl font-black text-sunflower-500 mx-4 my-3">
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
          onChange={emailHandler}
          className="bg-wetasphalt-500 text-clouds-500 mx-4 my-2 p-3 rounded-md w-1/2"
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          onChange={passwordHandler}
          className="bg-wetasphalt-500 text-clouds-500 mx-4 my-2 p-3 rounded-md w-1/2"
        />
        <NavLink
          to="/register"
          className={"mx-4 my-1 text-silver-500 font-semibold"}
        >
          Don't have an account?
        </NavLink>
        <button
          type="button"
          onClick={signInHandler}
          className="bg-clouds-500 font-bold w-fit p-3 rounded-md mx-4 my-3 hover:scale-110 hover:ease-in-out"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
