import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { injectModels } from "../../Redux/injectModel";
const Register=(props)=> {
  console.log(props,'props')
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const handleUsername = (e) => {
    const val = e.target.value.trim();
    setUsername(val);
    setErrorUsername(val ? "" : "Username is required.");
  };

  const handleEmail = (e) => {
    const val = e.target.value.trim();
    setEmail(val);
    if (!val) setErrorEmail("Email is required.");
    else if (!emailRegex.test(val)) setErrorEmail("Invalid email format.");
    else setErrorEmail("");
  };

  const handlePassword = (e) => {
    const val = e.target.value.trim();
    setPassword(val);
    if (!val) setErrorPassword("Password is required.");
    else if (!passwordRegex.test(val)) {
      setErrorPassword(
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
      );
    } else setErrorPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!username) {
      setErrorUsername("Username is required.");
      valid = false;
    }

    if (!email) {
      setErrorEmail("Email is required.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setErrorEmail("Invalid email format.");
      valid = false;
    }

    if (!password) {
      setErrorPassword("Password is required.");
      valid = false;
    } else if (!passwordRegex.test(password)) {
      setErrorPassword(
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
      );
      valid = false;
    }

    if (valid) {
      console.log('username:',username);
      console.log("email:", email);
      console.log("password", password);
    }
    try {
      let object = {
        username:username,     
        email: email,
        password: password,
       
      }
      const response = await props.auth.register(object);
      console.log("Register Response:", response);

      if (response.success) {
        alert("register successfully");
        navigate('/login');
      } else {
        alert(response.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={handleUsername}
        />
        {errorUsername && <p className='style'>{errorUsername}</p>}

        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={handleEmail}
        />
        {errorEmail && <p className='style'>{errorEmail}</p>}

        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={handlePassword}
        />
        {errorPassword && <p className='style'>{errorPassword}</p>}

        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
    </div>
  );
}
export default injectModels(['auth'])(Register);
