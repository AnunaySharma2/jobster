import { useToast } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [yearsofexp, setYearsofexpe] = useState(0);

  const toast = useToast();
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@vitap\.ac\.in$/;

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const isUserAlreadyPresent = async () => {
    const { data, error } = await supabase
      .from("Profile")
      .select("user_email")
      .eq("user_email", email)
      .single();

    if (error) {
      return false;
    }
    if (data) {
      return true;
    }

    return false;
  };

  const addUserToTheDatabase = async () => {
    if (isUserAlreadyPresent()) {
      return;
    }

    const { data, error } = await supabase.from("Profile").insert([
      {
        firstName: firstName,
        lastName: lastName,
        yearsofexp: yearsofexp,
        user_email: email,
      },
    ]);
    if (data) {
      console.log(data);
    } else {
      console.log(error);
    }
  };

  const registerHandler = () => {
    if (emailRegex.test(email) == false) {
      toast({
        title: "Invalid email 🤔",
        description: `Only emails with domain name @vitap.ac.in can register`,
        status: "error",
        duration: 2000,
        isClosable: false,
      });
      return;
    }
    async function registerWithEmail() {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) throw error;
        toast({
          title: "Registered! 🙌",
          description: "Check for email confirmation",
          status: "success",
          duration: 2000,
          isClosable: false,
        });
        addUserToTheDatabase();
        navigate("/");
      } catch (error) {
        toast({
          title: "Error 🤔",
          description: `${error}`,
          status: "error",
          duration: 2000,
          isClosable: false,
        });
      }
    }
    registerWithEmail();
  };

  return (
    <div className="flex flex-col justify-center h-screen p-5">
      <h1 className="text-5xl font-black text-sunflower-500 mx-4 my-3">
        Register
      </h1>
      <h2 className="text-xl text-lightwhite-100 mx-4 my-2">
        Find latest suitable jobs for you 😎
      </h2>
      <form className="flex flex-col justify-center my-1">
        <div className="flex flex-row w-3/4">
          <input
            placeholder="First name"
            type="text"
            name="firstname"
            id="firstname"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            className="bg-wetasphalt-500 text-clouds-500 ml-4 mx-4 my-2 p-3 rounded-md w-1/4"
          />
          <input
            placeholder="Last name"
            type="text"
            name="lastname"
            id="lastname"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            className="bg-wetasphalt-500 text-clouds-500 ml-1 mx-4 my-2 p-3 rounded-md w-1/4"
          />
        </div>
        <div className="flex flex-col w-3/4">
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
          <input
            type="number"
            placeholder="Years of experience"
            name="yearsofexp"
            id="yearsofexp"
            onChange={(e) => {
              setYearsofexpe(e.target.value);
            }}
            className="bg-wetasphalt-500 text-clouds-500 mx-4 my-2 p-3 rounded-md w-1/2"
          />
        </div>

        <NavLink to="/" className={"mx-4 my-1 font-semibold text-silver-500"}>
          Already have an account?
        </NavLink>
        <button
          type="button"
          onClick={registerHandler}
          className="bg-clouds-500 font-bold w-fit p-3 rounded-md mx-4 my-3 hover:scale-110 hover:ease-in-out"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
