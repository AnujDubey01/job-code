import React, { useState } from "react";
import Navbar from "../Utils/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup } from "../ui/radio-group";
import axios from "axios";
import { toast } from "sonner";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate(); 

  const changeEventHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changeFileHandler = (e) => {
    setInput((prev) => ({ ...prev, file: e.target.files?.[0] }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData =  new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if(input.file){
      formData.append("file",input.file);
    }
    try {
      const res = await axios.post(`{USER_API_END_POINT}/register` , formData , {
        headers: {
          "content-type": "multipart/form-data",
        },
        withCredentials:true,
      });
      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          <form onSubmit={submitHandler} className="bg-white shadow-lg rounded-xl px-8 py-10 border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h1>
              <p className="text-gray-600">
                Create your account to get started
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Full Name
                </Label>
                <Input
                  type="text"
                  name="fullname"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

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
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  placeholder="+91 12345 67890"
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
                      id="r1"
                      checked = {input.role === "student"}
                      onChange={changeEventHandler}
                      className="cursor-pointer w-4 h-4" // Add width/height for radio
                    />
                    <Label htmlFor="r1">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="role"
                      value="recruiter"
                      id="r2"
                      checked={input.role==="recruiter"}
                      onChange = {changeEventHandler}
                      className="cursor-pointer w-4 h-4" // Add width/height for radio
                    />
                    <Label htmlFor="r2">Recruiter</Label>
                  </div>
                </RadioGroup>

                <div className="flex items-center gap-2">
                  <Label>Profile</Label>
                  <Input
                    accept="image/*"
                    type="file"
                    onChange={changeFileHandler}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                Create Account
              </Button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
