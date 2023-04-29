import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

function Job({ company, role, stipend, link, likes, dislikes, created_at }) {
  function getCreatedDate(created_at) {
    const date = new Date(created_at);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <Card boxShadow={"dark-lg"}>
        <CardHeader>
          <h1 className="text-4xl text-emerland-500 font-extrabold p-2">
            {company}
          </h1>
          <h2 className="text-2xl text-amethyst-500 font-bold p-2">{role}</h2>
        </CardHeader>
        <CardBody>
          <p className="px-2 text-lg text-clouds-500 font-semibold">
            Stipend : {stipend === null ? "Not available" : `₹${stipend}`}
          </p>
          <p className="px-2 text-lg text-clouds-500 font-semibold">
            Job posted on {getCreatedDate(created_at)}
          </p>
        </CardBody>
        <CardFooter>
          <div className="flex flex-row justify-between p-2 w-full">
            <a className="font-bold text-silver-500" href={link}>
              Visit Site
            </a>
            <button className="font-semibold text-silver-500">
              {likes} 👍
            </button>
            <button className="font-semibold text-silver-500">
              {dislikes} 👎
            </button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default Job;
