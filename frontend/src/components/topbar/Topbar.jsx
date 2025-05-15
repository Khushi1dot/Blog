// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./topbar.css";
// import { injectModels } from "../../Redux/injectModel";

// function Topbar(props) {
//   const navigate = useNavigate();
//   const isAuthenticated = localStorage.getItem("isAuthenticated");
//   console.log(isAuthenticated, "isAuthenticated");

//   // useEffect(() => {
//   //   console.log("TopBar component running");
//   //   props.auth.getUser();
//   // }, []);
//   const { user } = props.auth;

//   console.log(user, "user");
//   console.log(props.auth, "props.auth");

//   const handleLogout = () => {
//     props.auth.logout();

//     navigate("/login");
//   };

//   // console.log(profilePic,'profilepic');
//   return (
//     <div className="top">
//       <div className="topLeft">
//         <i className="topIcon fab fa-facebook-square"></i>
//         <i className="topIcon fab fa-instagram-square"></i>
//         <i className="topIcon fab fa-pinterest-square"></i>
//         <i className="topIcon fab fa-twitter-square"></i>
//       </div>
//       <div className="topCenter">
//         <ul className="topList">
//           <li className="topListItem">
//             <Link className="link" to="/">
//               HOME
//             </Link>
//           </li>
//           <li className="topListItem">ABOUT</li>

//           {isAuthenticated && (
//             <React.Fragment>
//               <li className="topListItem">
//                 <Link className="link" to="/write">
//                   WRITE
//                 </Link>
//               </li>

//               <li className="topListItem" onClick={handleLogout}>
//                 LOGOUT
//               </li>
//             </React.Fragment>
//           )}
//         </ul>
//       </div>
//       <div className="topRight">
//         {user && user.profilePic ? (
//           <Link className="link" to="/settings">
//             <img className="topImg" src={user.profilePic} alt="" />
//           </Link>
//         ) : (
//           <p>no profile pic</p>
//         )}

//         {!isAuthenticated && (
//           <ul className="topList">
//             <li className="topListItem">
//               <Link className="link" to="/login">
//                 LOGIN
//               </Link>
//             </li>
//             <li className="topListItem">
//               <Link className="link" to="/register">
//                 REGISTER
//               </Link>
//             </li>
//           </ul>
//         )}
//         <i className="topSearchIcon fas fa-search"></i>
//       </div>
//     </div>
//   );
// }

// export default injectModels(["auth"])(Topbar);



import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./topbar.css";
import { injectModels } from "../../Redux/injectModel";

function Topbar(props) {
  const navigate = useNavigate();
  const { user, getUser } = props.auth;
  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token && !user) {
      getUser();
    }
  }, [user, getUser]);

  const handleLogout = () => {
    props.auth.logout();
    navigate("/login");
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>

      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">HOME</Link>
          </li>
          <li className="topListItem">ABOUT</li>

          {isAuthenticated && (
            <>
              <li className="topListItem">
                <Link className="link" to="/write">WRITE</Link>
              </li>
              <li className="topListItem" onClick={handleLogout}>LOGOUT</li>
            </>
          )}
        </ul>
      </div>

      <div className="topRight">
        {isAuthenticated ? (
          user ? (
            <Link className="link" to="/settings">
              <img className="topImg" src={user.profilePic} alt="profile" />
            </Link>
          ) : (
            <div className="loading-placeholder">Loading...</div>
          )
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">LOGIN</Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">REGISTER</Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}

export default injectModels(["auth"])(Topbar);
