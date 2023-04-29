import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/SignIn";
import '@fortawesome/fontawesome-free/css/all.css';
import Register from "./pages/Register";
import { ChakraProvider } from "@chakra-ui/react";
import JobListing from "./pages/JobListing";
import Projects from "./pages/Projects";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/jobs",
    element: <JobListing />,
  },
  {
    path: "/projects",
    element: <Projects/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
