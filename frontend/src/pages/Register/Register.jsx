import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import img from "./img.png";
import img1 from "./image.png";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSignupMutation } from "@/services/authApi";
import img2 from "../Login/google.png";
const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
    const [signup, { isLoading, error }] = useSignupMutation();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number (10 digits required)";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Call the signup mutation
        const userInfo = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNo: formData.phoneNumber,
          password: formData.password,
        };
        console.log(userInfo)
        await signup(userInfo).unwrap();  // Use .unwrap() to handle success or failure

        // Navigate to sign-in page after successful signup
        navigate("/signin");
      } catch (err) {
        // Handle any errors
        console.error("Signup failed:", err);
      }
    }
  };
  const auth = async () => {
    try {
      const base_url = import.meta.env.VITE_BASE_URL;
      const response = await fetch(`${base_url}/api/v1/user/request`, { method: 'post' });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Authentication failed:', error);
      alert('Failed to authenticate. Please try again.');
    }
  };
  const generateBubbles = () => {
    return [...Array(20)].map((_, index) => {
      const size = Math.random() * 80 + 30; // 30-110px
      const delay = Math.random() * 3;
      const duration = Math.random() * 15 + 10; // 10-25 seconds
      const opacity = Math.random() * 0.4 + 0.2; // 0.2-0.6 opacity

      return (
        <motion.div
          key={index}
          className="absolute rounded-full bg-primary-ultra backdrop-blur-sm"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 120}vh`,
            left: `${Math.random() * 100}vw`,
            background: 'radial-gradient(circle at 30% 30%, rgb(54, 116, 181)))', // Proper blue gradient
            boxShadow: '0 4px 20px rgb(87, 143, 202), inset 0 0 15px rgb(87, 143, 202)', // Blue shadow with blur
            border: '1px solid rgba(0,0,255,0.2)' // Blue border
          }}
          
          
          
          animate={{ 
            y: [
              0, 
              `-${Math.random() * 200 + 100}%`, 
              `-${Math.random() * 250 + 150}%`
            ],
            x: [
              `${Math.random() * 50 - 25}%`, 
              `${Math.random() * 100 - 50}%`,
              `${Math.random() * 50 - 25}%`
            ],
            scale: [
              1, 
              1.1, 
              0.9, 
              1
            ],
            opacity: [opacity, 0.1, 0]
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      );
    });
  };
  return (
    <div className="relative min-h-screen overflow-hidden pb-5">
      {/* Animated gradient background */}
      {generateBubbles()}
      {/* Main Signup Card Section */}
      <div className="flex items-center justify-center min-h-screen relative z-5">
        <div className="w-full max-w-md space-y-8 relative">
          {/* Top animation */}
          <motion.div
            className="absolute right-[-180px] w-40 z-0"
            animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <img src={img} alt="Right decoration" className="w-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="w-full relative bg-white/95 backdrop-blur-md transform transition-all duration-300 hover:shadow-xl z-1">
              <CardHeader className="space-y-1 text-center">
                <motion.h2
                  className="text-2xl font-semibold text-primary-light"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Create Your Account!
                </motion.h2>
                <p className="text-sm text-gray-500">
                  Join us and explore endless possibilities.
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* First Name */}
                  <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                  >
                                    <Button
                                      variant="outline"
                                      className="w-full flex items-center justify-center hover:bg-white"
                                      type="button"
                                      onClick={auth}
                                    >
                                      <img
                                        src={img2}
                                        alt="Google logo"
                                        className="mr-2 h-4 w-4"
                                      />
                                      <span className="text-primary-ultra">Sign in with Google</span>
                                    </Button>
                                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`transition-all duration-300 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:border-primary-light focus:ring focus:ring-primary-light`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                  </motion.div>

                  {/* Last Name */}
                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`transition-all duration-300 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:border-primary-light focus:ring focus:ring-primary-light`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      placeholder="johndoe@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`transition-all duration-300 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-primary-light focus:ring focus:ring-primary-light`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </motion.div>

                  {/* Phone Number */}
                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      placeholder="1234567890"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`transition-all duration-300 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} focus:border-primary-light focus:ring focus:ring-primary-light`}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                  </motion.div>

                  {/* Password */}
                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="********"
                      value={formData.password}
                      onChange={handleChange}
                      className={`transition-all duration-300 border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-primary-light focus:ring focus:ring-primary-light`}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </motion.div>

                  {/* Confirm Password */}
                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      type="password"
                      id="confirmPassword"
                      placeholder="********"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`transition-all duration-300 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:border-primary-light focus:ring focus:ring-primary-light`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                  </motion.div>

                  {errors.submit && (
                    <div className="text-red-500 text-sm text-center">{errors.submit}</div>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="w-full mt-4"
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-primary-light hover:bg-primary-dark transition-colors"
                    >
                      Sign Up
                    </Button>
                  </motion.div>
                </form>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <motion.div
                  className="text-sm text-center text-black"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Already have an account?
                  <Button
                    variant="link"
                    className="pl-1 font-normal text-primary-light"
                    onClick={() => navigate("/signin")}
                  >
                    Sign In
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Bottom image animation */}
      <motion.div
        className="absolute left-0 w-full z-0 hidden md:block"
        initial={{ opacity: 1, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto relative">
          <div className="absolute left-10 bottom-0">
            <img src={ img1} alt="Left decoration" className="w-[600px]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;