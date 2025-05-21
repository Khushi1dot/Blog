import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./singlePost.css";
import { format } from "timeago.js";
import { injectModels } from "../../Redux/injectModel";

function SinglePost(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const pf = "https://blogapp-6huo.onrender.com/images/";

  const { user, getUser } = props.auth;

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await props.posts.getPostById(id);

        const postData = Array.isArray(response) ? response[0] : response;

        if (!postData || !postData.title) {
          console.error("Invalid post data", postData);
          return;
        }

        setPost(postData);
        setTitle(postData.title);
        setDesc(postData.desc);
        console.log("Fetched post:", postData);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };
    getPost();
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token && !user) {
      getUser();
    }
  }, [user, getUser]);

  const handleDelete = async () => {
    try {
      const response = await props.posts.deletePostById(id);
      if (response && response.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Could not delete the post.");
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedPost = { title, desc };
      const response = await props.posts.updatePostById(id, updatedPost);
      console.log("Update response:", response);
      setUpdateMode(false);
      setPost({ ...post, title, desc });
    } catch (error) {
      console.error("Update failed:", error);
      alert("Could not update the post.");
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={pf + post.photo} alt="Post" />
        )}

        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            <p>Title:{post.title}</p>
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                >
                  Edit
                </i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                >
                  Delete
                </i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">{post.username}</b>
          </span>
          <span>{format(post.createdAt)}</span>
        </div>

        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">
            <p>Desc: {post.desc}</p>
          </p>
        )}

        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}

export default injectModels(["posts", "auth"])(SinglePost);
