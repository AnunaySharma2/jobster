import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SimpleGrid, useToast } from "@chakra-ui/react";
import { supabase } from "../supabaseClient";
import Project from "../components/Project";
import Modal from "../components/Modal";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchbox, setSearchBox] = useState("");

  const toast = useToast();

  useEffect(() => {
    getProjects();
  }, [searchbox]);

  function toggleModal() {
    setModalVisible(!modalVisible);
  }

  async function getProjects() {
    if (searchbox.length === 0) {
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
    }else{
      try {
        const { data, error } = await supabase.from("Projects").select("*").ilike("techstack", searchbox);
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
          to="/projects"
          className={"text-sunflower-500 font-black text-5xl p-3 mx-3"}
        >
          Projects
        </NavLink>
        <NavLink
          to="/profile"
          className={"text-wetasphalt-500 font-black text-5xl p-3 mx-3"}
        >
          Profile
        </NavLink>
      </div>
      <button
        onClick={() => {
          setModalVisible(!modalVisible);
        }}
        className="fixed font-bold text-lg text-midnightblue-500 bottom-5 right-5 rounded-full bg-sunflower-500 p-4"
      >
        Add project
      </button>
      <div className="flex flex-row">
        <input
          type="text"
          name="searchbox"
          id="searchbox"
          onChange={(e) => setSearchBox(e.target.value)}
          placeholder="Search projects by tech stack"
          className="mx-3 my-5 bg-midnightblue-900 p-3 text-lightwhite-100 rounded-md w-1/2"
        />
      </div>
      <SimpleGrid
        paddingTop={"5"}
        paddingLeft={"4"}
        paddingRight={"4"}
        paddingBottom={"5"}
        spacing={"7"}
        templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
      >
        {projects.map((project) => (
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
        ))}
      </SimpleGrid>
      {modalVisible && <Modal toggleModal={toggleModal} />}
    </div>
  );
}

export default Projects;
