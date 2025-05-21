import "./about.css";

export default function About() {
  return (
    <div className="about">
      <div className="aboutContent">
        <h1>About This Blog</h1>
        <p>
          Welcome to <strong>Radhe Blog</strong> – a platform where ideas, stories, and inspiration come to life.
          Whether you're here to share your thoughts, discover new perspectives, or just read something interesting,
          this is the place for you.
        </p>

        <h2>🌱 Our Mission</h2>
        <p>
          Our goal is to create a simple and engaging blogging experience for everyone.
          We believe in giving every voice a platform — whether you're an experienced writer or just starting out.
        </p>

        <h2>🚀 What You Can Do Here</h2>
        <ul>
          <li>📝 Create and share your own blog posts</li>
          <li>📚 Explore blogs from other users</li>
          <li>💬 Engage with content that resonates with you</li>
        </ul>

        <h2>👩‍💻 Built With Passion</h2>
        <p>
          This blog application was built using modern web technologies like React, Redux, Node.js, Express, and MongoDB.
          It's designed to be clean, fast, and user-friendly — because great content deserves a great platform.
        </p>

        <h2>📬 Get in Touch</h2>
        <p>
          Have feedback or suggestions? I'd love to hear from you.
          <br />
          Feel free to reach out via email or connect on social media.
        </p>

        <p className="thanks">Thanks for visiting and happy blogging!</p>
      </div>
    </div>
  );
}
