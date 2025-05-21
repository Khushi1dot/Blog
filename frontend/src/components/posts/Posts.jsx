import Post from "../post/Post";
import "./posts.css";

export default function Posts({ data,  }) {
  return (
    <div className="posts">
      {data.length === 0 ? (
        <div className="no-posts-message">
          <h2> You haven't created any posts yet.</h2>
          <a className="create-post-link" href="/write">
            Let's Create Post
          </a>
        </div>
      ) : (
       data.map((el)=>{
          return(<>
          <Post {...el}/>
          
          </>)
        })
      )}
    </div>
  );
}
