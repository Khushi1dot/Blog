import { useState, useEffect } from "react";
import "./write.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { injectModels } from "../../Redux/injectModel";


function Write(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

   const { user, getUser } = props.auth;
    // const isAuthenticated = !!user;
  
    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (token && !user) {
        getUser();
      }
    }, [user, getUser]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { user } = props.auth;
    console.log(props.auth);
console.log(user,'fetching user from write comp.')
    if (!user || !user.username) {
      navigate("/login");
      return;
    }

    const newPost = {
      username: user.username,
      title,
      desc,
    };
    console.log(newPost);

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("https://blogapp-6huo.onrender.com/upload", data);
      } catch (err) {
        console.log("Error during file upload:", err);
      }
    }

    try {
      const response = await props.posts.createPost(newPost);
      console.log("Response from newPost:", response);

      if (response && response.success === true) {
        navigate("/");
      }
    } catch (error) {
      console.error("Creating Post error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus">+</i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default injectModels(["posts", "auth"])(Write);
