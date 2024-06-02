import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";

export function Router() {
  const navigate = useNavigate();
  const [isReloaded, setIsReloaded] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:keyword" element={<Home />} />
        <Route path="/p/place/:facilityId" element={<Home />} />
      </Routes>
      <ToastContainer
        style={{ width: "448px" }}
        position="top-left"
        autoClose={100}
        draggable
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        theme="light"
        limit={1}
      />
    </>
  );
}
