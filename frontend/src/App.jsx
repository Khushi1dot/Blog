// import React, { useEffect } from 'react';
// import Topbar from "./components/topbar/Topbar";
// import Homepage from "./pages/homepage/Homepage";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
// import Settings from "./pages/settings/Settings";
// import Single from "./pages/single/Single";
// import Write from "./pages/write/Write";
// import { Routes, Route } from "react-router-dom";
// import ProtectRoutes from "./ProtectRoute";
// import { injectModels } from "./Redux/injectModel";
// // import Demo from "./pages/Demo";
// // import { Context } from "./context/Context";
// // import Mypost from "./pages/mypost/mypost";

// function App(props) {
//   // const { user, getUser } = props.auth;

//   // useEffect(() => {
//   //   const token = localStorage.getItem("access_token");
//   //   if (token && !user) {
//   //     getUser(); 
//   //   }
//   // }, [user, getUser]);
//   // console.log('props auth', props.auth);

//   useEffect(()=>{
//       const data=async()=>{
//         await props.auth.getUser();
//       };
//       data();
//   },[])
//   return (
//     <>
//       <Topbar  />

//       <Routes>
//         <Route element={<ProtectRoutes />}>
//           <Route path="/" element={<Homepage />} />
//           <Route path='/write' element={<Write/>}/>
//           <Route path="/settings" element={<Settings />}/>
//         </Route>

//         {/* <Route path="/posts"  element={<Homepage />}/> */}

//         <Route path="/register" element={<Register />} />

//         {/* <Route path="/mypost" element={<Mypost />}/>  */}

//         <Route path="/login" element={<Login />} />
//         {/* {currentUser ? <Homepage /> : <Login />} */}

//         <Route path="/post/:id" element={<Single />} />

       

     
//         {/* <Route path="/settings" element={<Settings />}/> */}

//         {/* {currentUser ? <Settings /> : <Login />} */}
//       </Routes>
//     </>
//   );
// }

// export default injectModels(["auth"])(App);



import React, { useEffect } from 'react';
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { Routes, Route } from "react-router-dom";
import ProtectRoutes from "./ProtectRoute";
import { injectModels } from "./Redux/injectModel";

function App(props) {
  const { user, getUser } = props.auth;

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token && !user) {
      getUser(); 
    }
  }, [user, getUser]);

  return (
    <>
      <Topbar />

      <Routes>
        <Route element={<ProtectRoutes />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/write" element={<Write />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<Single />} />
      </Routes>
    </>
  );
}

export default injectModels(["auth"])(App);
