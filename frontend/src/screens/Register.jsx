import axios from '../config/axios';

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Register() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [age,setAge] = useState('')
//     const [gender,setGender] = useState('')

//     const navigate = useNavigate();

//     function submitHandler(e) {
//         e.preventDefault();
//         axios.post('/users/register', { email, password,age,gender })
//         .then((res) => {
//             console.log(res.data);
//             navigate('/');
//         }).catch((err) => {
//             console.log(err);
//         }
//         );
//     }

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-900">
//             <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
//                 <h2 className="text-2xl font-bold text-white mb-6">Register</h2>
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
//                     <div className="mb-6">
//                         <label className="block text-gray-400 mb-2" htmlFor="age">Age</label>
//                         <input
//                             type="number"
//                             id="age"
//                             className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             value={age}
//                             onChange={(e) => setAge(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-gray-400 mb-2" htmlFor="gender">Gender</label>
//                         <input
                            
//                             id="gender"
//                             className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             value={gender}
//                             onChange={(e) => setGender(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
//                     >
//                         Register
//                     </button>
//                 </form>
//                 <p className="text-gray-400 mt-4">
//                     Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default Register;

import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from '../context/user.context';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  age: z.number().min(1, { message: "Age is required" }),
  gender: z.enum(["Male", "Female", "Other"], { message: "Select a gender" }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
});

const Register = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      age: "",
      gender: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (values) => {
    setError(null);
    setIsLoading(true);
    
    
    try {
        const response = await axios.post("/users/register", values);
        console.log("Registration Successful:", response.data);
    
        alert("Account created successfully!");
        // Store token in local storage
      localStorage.setItem("token", response.data.token);
  
      // Set user state (if you have a context or state for user)
      
      setUser(response.data.user);
        navigate("/");
      } catch (err) {
        console.error("Registration error:", err);
        setError(err.response?.data?.message || "Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block font-medium">Email</label>
            <input 
              type="email" 
              className="w-full border p-2 rounded-md" 
              placeholder="your.email@example.com"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block font-medium">Password</label>
            <input 
              type="password" 
              className="w-full border p-2 rounded-md" 
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Age Field */}
          <div>
            <label className="block font-medium">Age</label>
            <input 
              type="number" 
              className="w-full border p-2 rounded-md" 
              placeholder="Enter your age"
              {...register("age", { valueAsNumber: true })}
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
          </div>

          {/* Gender Field */}
          <div>
            <label className="block font-medium">Gender</label>
            <select 
              className="w-full border p-2 rounded-md" 
              {...register("gender")}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              {...register("termsAccepted")}
              className="w-4 h-4"
            />
            <label className="text-sm">
              I agree to the 
              <Link to="/terms" className="text-blue-600 hover:underline"> Terms</Link> 
              & 
              <Link to="/privacy" className="text-blue-600 hover:underline"> Privacy Policy</Link>
            </label>
          </div>
          {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>}

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Already have an account? */}
        <p className="text-sm text-center mt-4">
          Already have an account? 
          <Link to="/login" className="text-blue-600 hover:underline"> Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;