import React from "react";

function Job({ company, role, stipend, link, likes, dislikes, created_at }) {
  function getCreatedDate(created_at) {
    const date = new Date(created_at);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="m-3 card p-4 rounded-lg sm:w-3/4 lg:w-1/3 bg-background-300 z-10 text-primary-content drop-shadow-3xl">
      <div className="card-body flex flex-row justify-between">
        <h2 className="text-3xl text-pink-400 font-bold my">{company}</h2>
        <p className="text-xl text-blue-400 font-semibold my-1">{role}</p>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          {stipend !== null ? (
            <p className="lg:text-lg md:text-sm text-blue-500 font-medium my-1">
              Expected stipend: {`${stipend}INR`}
            </p>
          ) : (
            <p className="lg:text-lg md:text-sm text-blue-500 font-medium my-1">
              Expected stipend not available
            </p>
          )}
        </div>
        <div>
          <p className="lg:text-lg md:text-sm text-blue-200 my-1">
            {getCreatedDate(created_at)}
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="justify-end my-2 rounded-md">
          <a href={link} className="p-1 text-lightpink-100">
            Visit Site
          </a>
        </div>
        <div className="flex flex-row gap-3">
          <button className="text-xl text-lightpink-100">{likes} 👍</button>
          <button className="text-xl text-lightpink-100">{dislikes} 👎</button>
        </div>
      </div>
    </div>
  );
}

export default Job;
