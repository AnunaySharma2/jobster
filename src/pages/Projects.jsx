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

  const toast = useToast();

  useEffect(() => {
    getProjects();
  }, []);

  function toggleModal() {
    setModalVisible(!modalVisible);
  }

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

  return (
    <div className="h-screen p-3">
      <div className="flex">
        <NavLink
          to="/jobs"
          className={"text-wetasphalt-500 font-black text-5xl p-3 mx-3"}
        >
          Latest Jobs
        </NavLink>
        <h1 className="text-sunflower-500 font-black text-5xl p-3 mx-3">
          Projects
        </h1>
      </div>
      <button
        onClick={() => {
          setModalVisible(!modalVisible);
        }}
        className="fixed font-bold text-lg text-midnightblue-500 bottom-5 right-5 rounded-full bg-sunflower-500 p-4"
      >
        Add project
      </button>
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
      {modalVisible && <Modal toggleModal={toggleModal}/>}
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <h1 className="text-4xl font-bold text-clouds-500 p-5">Add Project</h1>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Project Name"
                  className="shadow appearance-none border mb-2 rounded w-full py-2 px-3 text-clouds-500 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                  type="text"
                  name="techstack"
                  id="techstack"
                  onChange={(e) => {
                    setTechStack(e.target.value);
                  }}
                  placeholder="Tech stack used"
                  className="shadow appearance-none border my-2 rounded w-full py-2 px-3 text-clouds-500 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                  type="text"
                  name="desc"
                  id="desc"
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  placeholder="Brief Description"
                  className="shadow appearance-none border my-2 rounded w-full py-2 px-3 text-clouds-500 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                  type="text"
                  name="link"
                  id="link"
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                  placeholder="Live Link"
                  className="shadow appearance-none border my-2 rounded w-full py-2 px-3 text-clouds-500 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                  type="text"
                  name="github"
                  id="github"
                  onChange={(e) => {
                    setGithub(e.target.value);
                  }}
                  placeholder="Github"
                  className="shadow appearance-none border my-2 rounded w-full py-2 px-3 text-clouds-500 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="bg-sunflower-500 font-semibold p-3 rounded-md" onClick={submitHandler}>
              Submit
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </div>
  );
}

export default Projects;
