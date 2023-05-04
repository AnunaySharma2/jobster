import React from "react";

function Promotion() {
  return (
    <>
      <div className="p-3">
        <p className="font-semibold text-lg text-emerland-500">
          This project is open source.{" "}
          <a
            href="https://github.com/AnunaySharma2/jobster"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Click here
          </a>{" "}
          to start contributing!
        </p>
      </div>
    </>
  );
}

export default Promotion;
