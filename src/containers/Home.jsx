import React from "react";
import { Route, Routes } from "react-router-dom";
import Feed from "../pages/Feed";
import NotFound from "../pages/NotFound";

const Home = () => {
  return (
    <div className="h-screen w-full">
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Home;
