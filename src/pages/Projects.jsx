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

function Projects() {
  const [projects, setProjects] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="h-screen p-3">
      <div className="flex">
        <h1 className="text-lightwhite-100 font-black text-5xl p-3 mx-3">
          Projects
        </h1>
        <NavLink
          to="/jobs"
          className={"text-lightgrey-100 font-black text-5xl p-3 mx-3"}
        >
          Latest Jobs
        </NavLink>
      </div>
      <button
        onClick={onOpen}
        className="fixed font-bold text-lg bottom-5 right-5 rounded-full bg-blue-500 text-white p-4"
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
                  placeholder="Project Name"
                  className="shadow appearance-none border mb-2 rounded w-full py-2 px-3 text-lightwhite-100 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Tech stack used"
                  className="shadow appearance-none border my-2 rounded w-full py-2 px-3 text-lightwhite-100 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Brief Description"
                  className="shadow appearance-none border my-2 rounded w-full py-2 px-3 text-lightwhite-100 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Live Link"
                  className="shadow appearance-none border my-2 rounded w-full py-2 px-3 text-lightwhite-100 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Github"
                  className="shadow appearance-none border my-2 rounded w-full py-2 px-3 text-lightwhite-100 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Projects;
