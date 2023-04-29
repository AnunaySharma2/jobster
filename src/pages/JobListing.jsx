import "../global.css";
import { SimpleGrid, useToast } from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import Job from "../components/Job";
import { NavLink } from "react-router-dom";
import { supabase } from "../supabaseClient";

function JobListing() {
  const [jobs, setJobs] = useState([]);

  const toast = useToast();
  useEffect(() => {
    getJobs();
  }, []);

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
