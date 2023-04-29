import React from "react";

import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

function Project({
  projectname,
  techstack,
  description,
  livelink,
  github,
  email,
  created_at,
}) {
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
            {projectname}
          </h1>
          <h2 className="text-2xl text-amethyst-500 font-bold p-2">
            {techstack}
          </h2>
        </CardHeader>
        <CardBody>
          <p className="px-2 text-lg text-clouds-500 ">{description}</p>
        </CardBody>
        <CardFooter>
          <div className="flex flex-row justify-between p-2 w-full">
            <a target="_blank" className="font-bold text-silver-500" href={livelink}>
              Link to Project
            </a>
            <a target="_blank" className="font-bold text-silver-500" href={github}>
              Github
            </a>
            <p className="font-bold text-silver-500">{email}</p>
            <p className="px-2 text-lg text-clouds-500 font-light">
              {getCreatedDate(created_at)}
            </p>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default Project;
