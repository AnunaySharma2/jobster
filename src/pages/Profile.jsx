import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Project from "../components/Project";
import { SimpleGrid, useToast } from "@chakra-ui/react";

function Profile() {
  const [projects, setProjects] = useState([]);
  const [email, setEmail] = useState("");

  const toast = useToast();

  const session = supabase.auth.getSession();
  session
    .then((data) => {
      setEmail(data.data.session.user.email);
    })
    .catch((err) => console.log(err));

  useEffect(() => {
    getProjects();
  }, []);

  async function getProjects() {
    try {
      const { data, error } = await supabase.from("Projects").select("*");
      if (error) throw error;
      if (data != null) {
        setProjects(data);
      }
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

  async function deleteProject(uuid) {
    try {
      const { data, error } = await supabase
        .from("Projects")
        .delete()
        .eq("id", uuid);
      if (error) throw error;
      console.log(data);
    } catch (error) {
      toast({
        title: "Could not delete 🤔",
        description: `${error}`,
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  }

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
        <h1 className={"text-sunflower-500 font-black text-5xl p-3 mx-3"}>
          Profile
        </h1>
      </div>
      <div>
        <h1 className="text-carrot-500 p-3 mx-3 font-extrabold text-5xl">
          Hello,{" "}
          {email.split(".")[0].charAt(0).toUpperCase() +
            email.split(".")[0].slice(1)}
        </h1>
        <h2 className="text-silver-500 px-3 py-2 mx-3 font-semibold text-xl">
          Your registered email : {email}
        </h2>
      </div>
      <h1 className={"text-carrot-500 font-extrabold text-5xl p-3 mx-3"}>
        Your Projects
      </h1>
      <div>
        <SimpleGrid
          paddingTop={"5"}
          paddingLeft={"4"}
          paddingRight={"4"}
          paddingBottom={"5"}
        >
          {projects.filter((project) => project.user_email === email).length ===
            0 && (
            <div className="text-silver-500 px-3 font-semibold text-xl">
              You haven't added any projects yet!
            </div>
          )}
          {projects
            .filter((project) => project.user_email === email)
            .map((project) => (
              <div key={project.id}>
                <Project
                  key={project.id}
                  projectname={project.projectname}
                  techstack={project.techstack}
                  description={project.description}
                  livelink={project.livelink}
                  github={project.github}
                  email={project.user_email}
                  created_at={project.created_at}
                />
                <button
                  onClick={() => {
                    deleteProject(`${project.id}`);
                  }}
                  className="bg-alizin-500 p-2 my-4 text-clouds-500 rounded-md"
                >
                  Delete
                </button>
              </div>
            ))}
        </SimpleGrid>
      </div>
    </div>
  );
}

export default Profile;
