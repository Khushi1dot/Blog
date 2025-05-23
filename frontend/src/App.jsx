import React, { useEffect } from "react";
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import MyPost from "./pages/mypost/MyPost";
import About from "./pages/about/About";
import { Routes, Route } from "react-router-dom";
import ProtectRoutes from "./ProtectRoute";
import { injectModels } from "./Redux/injectModel";

function App(props) {
  const { user, getUser } = props.auth;

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const isAuthenticated= localStorage.getItem("isAuthenticated");
    if (token && isAuthenticated && !user) {
      getUser();
    }
  }, [user, getUser]);

  return (
    <>
      <Topbar />

      <Routes>
        <Route element={<ProtectRoutes />}>
          <Route path="/" element={<Homepage />} />
           <Route path="/about" element={<About />} />
          <Route path="/write" element={<Write />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/mypost" element={<MyPost/>} />
           <Route path="/post/:id" element={<Single />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         
      </Routes>
    </>
  );
}

export default injectModels(["auth"])(App);
