import "../global.css";
import { SimpleGrid, useToast } from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import Job from "../components/Job";
import { NavLink } from "react-router-dom";
import { supabase } from "../supabaseClient";

function JobListing() {
  const [jobs, setJobs] = useState([]);
  const [searchbox, setSearchBox] = useState("");

  const toast = useToast();
  useEffect(() => {
    if (searchbox.length === 0) {
      getJobs();
    } else if(searchbox.length >= 2) {
      getCustomJobs();
    }
  }, [searchbox]);

  async function getCustomJobs() {
    try {
      const { data, error } = await supabase
        .from("Jobs")
        .select()
        .ilike("Role", `%${searchbox}%`);
      if (error) throw error;
      if (data != null) {
        setJobs(data);
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

  async function getJobs() {
    try {
      const { data, error } = await supabase.from("Jobs").select("*");
      if (error) throw error;
      if (data != null) {
        setJobs(data);
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
        <h1 className="text-sunflower-500 font-black text-5xl p-3 mx-3">
          Latest Jobs
        </h1>
        <NavLink
          to="/projects"
          className={"text-wetasphalt-500 font-black text-5xl p-3 mx-3"}
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
      <div className="flex flex-row">
        <input
          type="text"
          name="searchbox"
          id="searchbox"
          onChange={(e) => setSearchBox(e.target.value)}
          placeholder="Search jobs by position"
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
        {jobs.map((job) => (
          <Job
            key={job.id}
            company={job.Company}
            role={job.Role}
            stipend={job.Stipend}
            link={job.Link}
            likes={job.Likes}
            dislikes={job.Dislikes}
            created_at={job.created_at}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}

export default JobListing;
