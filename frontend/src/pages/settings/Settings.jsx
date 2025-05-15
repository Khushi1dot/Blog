import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { injectModels } from "../../Redux/injectModel";
import axios from "axios";

function Settings(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const PF = "https://radheblog-production.up.railway.app/images/"

  // const [success, setSuccess] = useState(true);

  useEffect(() => {
 props.auth.getUser();
    console.log(props.auth);
    // if (userDetails) {
    //   const parsedUser = JSON.parse(userDetails);
    //   console.log(parsedUser, "userDetails");
    //   setUsername(parsedUser.username || "");
    //   setEmail(parsedUser.email || "");
    // }
  }, [props.auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {user} =props.auth;
    console.log(user);
     if (!user) {
      navigate("/login");
      return;
    }
    const parsedUserDetails = JSON.parse(user);
    console.log(parsedUserDetails);

    const updatedUser = {
      username,
      email,
      password,
    };

    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.photo = filename;
      try {
        await axios.post("https://blogapp-6huo.onrender.com/upload", data);

      } catch (err) {
        console.log(err)
      }
    }

    try {
      const response = await props.auth.update(updatedUser);
      console.log("Response from setting :", response);

      if (response && response.success === true) {
        navigate("/");
      }
    } catch (error) {
      console.error("Updating user details error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          {/* <label>Profile Picture</label> */}
          <div className="settingsPP">
            {/* <img
             src={file ? URL.createObjectURL(file) : PF+username: parsedUserDetails.}
              alt=""
            /> */}

            {/* <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            /> */}
          </div>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter Username"
            name="name"
          />
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email"
            name="email"
          />
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            name="password"
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>

          {/* {!success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )} */}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
export default injectModels(["auth"])(Settings);
