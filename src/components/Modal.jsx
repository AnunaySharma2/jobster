import React from "react";
import { supabase } from "../supabaseClient";
import { useState } from "react";

function Modal(props) {
  const [name, setName] = useState("");
  const [techStack, setTechStack] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [github, setGithub] = useState("");
  const [email, setEmail] = useState("");

  const session = supabase.auth.getSession();
  session
    .then((data) => setEmail(data.data.session.user.email.split("@")[0]))
    .catch((err) => console.log(err));

  const submitHandler = async () => {
    const { data, error } = await supabase.from("Projects").insert([
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
    <>
      <div className="fixed shadow-2xl z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-midnightblue-900 opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="px-4 py-6">
              <h2 className="text-4xl py-3 mb-3 font-black text-sunflower-500">
                Add Project
              </h2>

              <div className="mt-1 text-sm text-gray-500">
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
                      className="shadow-lg appearance-none  mb-2 rounded w-full p-4 text-clouds-500 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <input
                      type="text"
                      name="techstack"
                      id="techstack"
                      onChange={(e) => {
                        setTechStack(e.target.value);
                      }}
                      placeholder="Tech stack used"
                      className="shadow-lg appearance-none  my-2 rounded w-full p-4 text-clouds-500 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <input
                      type="text"
                      name="desc"
                      id="desc"
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                      placeholder="Brief Description"
                      className="shadow-lg appearance-none  my-2 rounded w-full p-4 text-clouds-500 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <input
                      type="text"
                      name="link"
                      id="link"
                      onChange={(e) => {
                        setLink(e.target.value);
                      }}
                      placeholder="Live Link"
                      className="shadow-lg appearance-none  my-2 rounded w-full p-4 text-clouds-500 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <input
                      type="text"
                      name="github"
                      id="github"
                      onChange={(e) => {
                        setGithub(e.target.value);
                      }}
                      placeholder="Github link"
                      className="shadow-lg appearance-none  my-2 rounded w-full p-4 text-clouds-500 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="px-4 pb-3 text-right flex justify-between">
              <button
                type="button"
                className="inline-flex justify-center text-clouds-500 px-4 py-3 text-md font-medium bg-pomegranate-500   rounded-md "
                onClick={props.toggleModal}
              >
                Close
              </button>
              <button
                type="button"
                className="inline-flex justify-center text-midnightblue-500 px-4 py-3 text-md font-medium bg-sunflower-500   rounded-md "
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
