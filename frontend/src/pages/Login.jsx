import { useState } from "react";
import loginImg from "../assets/loginPage/loginImg.webp";
import { Link } from "react-router-dom";

export const Login = () => {
  // const [name, setName] = useState(null);
  const [emailEntry, setEmailEntry] = useState(null);
  const [passwordEntry, setPasswordEntry] = useState(null);

  return (
    <div className="flex">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12">
        {/* Login Form */}
        <form className="w-full max-w-md bg-white flex flex-col md:p-12 p-8 border border-gray-300 rounded-lg shadow-sm">
          {/* Text Section */}
          <div className="flex justify-center mb-6">
            <h2 className="font-medium text-xl">Rabbit</h2>
          </div>
          <h2 className="mb-6 font-bold text-center text-2xl">Hey There!👋</h2>
          <p className="text-center mb-6">
            Enter your username and password to Login
          </p>

          {/* Email Section */}
          <div className="mb-4 ">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={emailEntry}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none  "
              onChange={(e) => setEmailEntry(e.target.value)}
            />
          </div>

          {/* Password Section */}
          <div className="mb-4 ">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={passwordEntry}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none  "
              onChange={(e) => setPasswordEntry(e.target.value)}
            />
          </div>

          {/* Buntton */}
          <button
            type="submit"
            className="w-full text-white bg-black rounded-lg p-2 font-semibold hover:bg-gray-800 transition"
          >
            Sign in
          </button>

          {/* Rigester S */}
          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            {
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            }
          </p>
        </form>
      </div>

      {/* Right Side */}
      <div className="hidden sm:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={loginImg}
            alt="Login to account"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
