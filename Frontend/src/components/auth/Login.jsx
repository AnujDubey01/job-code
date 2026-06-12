import React, { useState } from "react";
import Navbar from "../Utils/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { RadioGroup } from "../ui/radio-group";

function Login() {
   const [input, setInput] = useState({
       email: "",
       password: "",
       role: "",
     });
   
     const changeEventHandler = (e) => {
       setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
     };

     const submitHandler = async (e) => {
       e.preventDefault();
       console.log(input);
     }
   
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          <form onSubmit={submitHandler} className="bg-white shadow-lg rounded-xl px-8 py-10 border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">LogIn</h1>
              {/* <p className="text-gray-600">
                Create your account to get started
              </p> */}
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Email Address
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              {/* radio Group */}
              <div className="flex items-center justify-between">
                <RadioGroup className="flex items-center gap-4 my-5">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role==="student"}
                      onChange = {changeEventHandler}
                      id="r1"
                      className="cursor-pointer w-4 h-4" // Add width/height for radio
                    />
                    <Label htmlFor="r1">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role==="student"}
                      onChange = {changeEventHandler}
                      id="r2"
                      className="cursor-pointer w-4 h-4" // Add width/height for radio
                    />
                    <Label htmlFor="r2">Recruiter</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                Login
              </Button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/Signup"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
