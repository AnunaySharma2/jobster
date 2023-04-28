import React from "react";
import { useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);

  return (
    <div>
      <h1>Projects</h1>
      <h3>Add projects to your portfolio</h3>
      <button className="bg-blue-400 font-medium w-fit p-3 rounded-md mx-4 my-3 hover:scale-110 hover:ease-in-out">
        Add project
      </button>
    </div>
  );
}

export default Projects;
