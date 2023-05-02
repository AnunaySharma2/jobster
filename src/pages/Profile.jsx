import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Profile() {
  const [email, setEmail] = useState("");

  const session = supabase.auth.getSession();
  session
    .then((data) => {
      setEmail(data.data.session.user.email);
    })
    .catch((err) => console.log(err));

  return (
    <div className="h-screen p-3">
      <div className="flex">
        <NavLink
          to="/jobs"
          className={"text-wetasphalt-500 font-black text-5xl p-3 mx-3"}
        >
          Latest Jobs
        </NavLink>
        <NavLink
          className="text-wetasphalt-500 font-black text-5xl p-3 mx-3"
          to={"/projects"}
        >
          Projects
        </NavLink>
        <h1
          to="/profile"
          className={"text-sunflower-500 font-black text-5xl p-3 mx-3"}
        >
          Profile
        </h1>
      </div>
      <div>
        <h1 className="text-emerland-500 p-3 mx-3 font-extrabold text-5xl">Hello, {email.split(".")[0].charAt(0).toUpperCase() + email.split(".")[0].slice(1)}</h1>
        <h2 className="text-nephritis-500 px-3 py-1 mx-3 font-semibold text-2xl">Your registered email : {email}</h2>
      </div>
    </div>
  );
}

export default Profile;
