import "./login.css";

import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { injectModels } from "../../Redux/injectModel";

const Login=(props)=> {
  console.log(props,'props');
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const handleEmailChange = (e) => {
    const val = e.target.value.trim();
    setEmail(val);
    if (!val) setErrorEmail("Email is required.");
    else if (!emailRegex.test(val)) setErrorEmail("Invalid email format.");
    else setErrorEmail("");
  };

  const handlePasswordChange = (e) => {
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
  
    if (!email || !emailRegex.test(email)) {
      setErrorEmail("Please enter a valid email.");
      valid = false;
    }
  
    if (!password || !passwordRegex.test(password)) {
      setErrorPassword(
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.");
      valid = false;
    }
  
    if (valid) {
      try {
        const object = {
          email: email,
          password: password,
        };
  
        const response = await props.auth.login(object); 
  
        // Log the response for debugging
        // console.log('Response from login :', response);
  
        if (response && response.success === true) {
          // If the login is successful, redirect
          navigate("/");
        } else{
          // setErrorEmail("Invalid email or password");
          console.log('Invalid user');
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };
  

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your email..."
          onChange={handleEmailChange}
        />
        {errorEmail && <p className='style'>{errorEmail}</p>}

        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          onChange={handlePasswordChange}
        />
        {errorPassword && <p className='style'>{errorPassword}</p>}

        <button type="submit" className="loginButton" >
          Login
        </button>
      </form>

      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
export default injectModels(["auth"])(Login);