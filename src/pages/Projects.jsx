import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { supabase } from "../supabaseClient";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [techStack, setTechStack] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [github, setGithub] = useState("");
  const [email, setEmail] = useState("");

  const session = supabase.auth.getSession();
  session
    .then((data) => setEmail(data.data.session.user.email))
    .catch((err) => console.log(err));

  const { isOpen, onOpen, onClose } = useDisclosure();

  const submitHandler = async () => {
    const { data, error } = await supabase
      .from("Projects")
      .insert([
        {
          projectname: name,
          techstack: techStack,
          description: desc,
          livelink: link,
          github: github,
          user_email: email,
        },
      ]);
    if (data) {
      console.log(data);
    } else {
      console.log(error);
    }
  };

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
        onClick={onOpen}
        className="fixed font-black text-lg bottom-5 right-5 rounded-full bg-blue-500 text-white p-4"
      >
        Add project
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <h1 className="text-3xl text-lightwhite-100 p-5">Add Project</h1>
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
                  className="shadow appearance-none border mb-2 rounded w-full py-2 px-3 text-lightwhite-100 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                  type="text"
                  name="techstack"
                  id="techstack"
                  onChange={(e) => {
                    setTechStack(e.target.value);
                  }}
                  placeholder="Tech stack used"
                  className="shadow appearance-none border my-2 rounded w-full py-2 px-3 text-lightwhite-100 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                  type="text"
                  name="desc"
                  id="desc"
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  placeholder="Brief Description"
                  className="shadow appearance-none border my-2 rounded w-full py-2 px-3 text-lightwhite-100 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                  type="text"
                  name="link"
                  id="link"
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                  placeholder="Live Link"
                  className="shadow appearance-none border my-2 rounded w-full py-2 px-3 text-lightwhite-100 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                  type="text"
                  name="github"
                  id="github"
                  onChange={(e) => {
                    setGithub(e.target.value);
                  }}
                  placeholder="Github"
                  className="shadow appearance-none border my-2 rounded w-full py-2 px-3 text-lightwhite-100 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitHandler}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Projects;
