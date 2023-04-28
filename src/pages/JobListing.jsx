import '../global.css';
import { useToast } from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import Job from "../components/Job";
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
      <h1 className="text-lightwhite-100 font-black text-5xl p-3 mx-3">
        Latest Jobs
      </h1>
      <div className="flex flex-col">
        {jobs.map((job) => (
          <div key={job.id}>
            <Job
              company={job.Company}
              role={job.Role}
              stipend={job.Stipend}
              link={job.Link}
              likes={job.Likes}
              dislikes={job.Dislikes}
              created_at={job.created_at}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobListing;
