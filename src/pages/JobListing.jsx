import { useToast } from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
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

  return <div className="bg-background-300 h-screen">
    {
      jobs.map((job) => (
        <div key={job.id}>
          <h1 className="text-lightwhite-100">{job.Company}</h1>
        </div>
      ))
    }
  </div>;
}

export default JobListing;
