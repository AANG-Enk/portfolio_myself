import type { RouteRecord } from "vite-react-ssg";
import React from "react";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import StudyCase from "./pages/StudyCase";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    entry: "src/Layout.tsx",
    children: [
      { index: true, element: <Home />, entry: "src/pages/Home.tsx" },
      { path: "about", element: <About />, entry: "src/pages/About.tsx" },
      { path: "projects", element: <Projects />, entry: "src/pages/Projects.tsx" },
      { path: "projects/:slug", element: <Projects />, entry: "src/pages/Projects.tsx" },
      { path: "study-case", element: <StudyCase />, entry: "src/pages/StudyCase.tsx" },
      { path: "study-case/:slug", element: <StudyCase />, entry: "src/pages/StudyCase.tsx" },
      { path: "blog", element: <Blog />, entry: "src/pages/Blog.tsx" },
      { path: "blog/:slug", element: <Blog />, entry: "src/pages/Blog.tsx" },
      { path: "contact", element: <Contact />, entry: "src/pages/Contact.tsx" },
      { path: "*", element: <NotFound />, entry: "src/pages/NotFound.tsx" },
    ],
  },
];
