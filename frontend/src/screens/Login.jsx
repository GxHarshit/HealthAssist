import axios from '../config/axios';
// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { UserContext } from '../context/user.context';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const { setUser } = useContext(UserContext);
    

    

//     const submitHandler = (e) => {
//         e.preventDefault();
//         axios.post('/users/login', { email, password })
//         .then((res) => {
//             console.log(res.data.user);
//             localStorage.setItem('token', res.data.token); // set token in cookie storage which recived from backend after login
//             setUser(res.data.user);

//             navigate('/');
//             })
//             .catch((err) => {
//                 console.log(err);
//             }
//             );
//     }
            
  

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-900">
//             <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
//                 <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
//                 <form onSubmit={submitHandler}>
//                     <div className="mb-4">
//                         <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
//                     >
//                         Login
//                     </button>
//                 </form>
//                 <p className="text-gray-400 mt-4">
//                     Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Create one</Link>
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default Login;

import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from '../context/user.context';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(3, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    setError(null);
    setIsLoading(true);
  
    try {
      const response = await axios.post("/users/login", {
        email: data.email,
        password: data.password,
      });
  
      console.log("Login Successful:", response.data.user);
  
      // Store token in local storage
      localStorage.setItem("token", response.data.token);
  
      // Set user state (if you have a context or state for user)
      setUser(response.data.user);
  
      alert("Logged in successfully!");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md  min-h-[400px] bg-white shadow-lg rounded-lg p-6">
        <div className="text-center mb-4">
          <Link to="/" className="text-2xl font-bold text-blue-600 my-40px">HealthAssist</Link>
          <h2 className="text-xl font-semibold mt-4">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Enter your credentials to sign in</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 space-x-4 ">
          <div >
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;