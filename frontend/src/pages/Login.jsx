import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = mode === "signup" ? "/api/auth/register" : "/api/auth/login";
      const body = mode === "signup" ? { name, email, password } : { email, password };
      const res = await axios.post("https://minicrm-1-zxyz.onrender.com" + endpoint, body);

      if (mode === "login") {
        login(res.data.token);
        navigate("/builder");
      } else {
        alert("Signup successful! Please login.");
        setMode("login");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      login(token);
      navigate("/builder");
    } catch (error) {
      alert("Google sign-in failed");
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full flex justify-center p-6">
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 w-full max-w-md text-white space-y-6">
          <h2 className="text-3xl font-bold text-center">
            {mode === "login" ? "Welcome Back" : "Create an Account"}
          </h2>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white/20 border border-white/30 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white/20 border border-white/30 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 rounded-lg shadow-md hover:cursor-pointer"
            >
              {mode === "login" ? "Login" : "Sign Up"}
            </button>
          </form>
  
          <div className="text-center text-sm">or</div>
  
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition hover:cursor-pointer"
          >
            Continue with Google
          </button>
  
          <p className="text-center text-sm mt-4">
            {mode === "login" ? "New here?" : "Already have an account?"}{" "}
            <button
              onClick={toggleMode}
              className="text-indigo-400 hover:text-indigo-300 font-medium underline hover:cursor-pointer"  
            >
              {mode === "login" ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
  
};

export default Login;
