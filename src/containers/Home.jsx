import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Feed from "../pages/Feed";
import NotFound from "../pages/NotFound";

const Home = () => {
  const state = useSelector(state => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    if(!state.data) {
      navigate("/login", { replace: true })
    }
  }, [state.data])

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
