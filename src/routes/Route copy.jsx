import { Suspense, lazy } from "react";
import { Navigate, Routes, useRoutes } from "react-router-dom";
import SampleDoc from "./sample";
import Layout from "./Layout";


const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        { path: "", element: <SampleDoc></SampleDoc>},
      ],
    },
  ]);
}

