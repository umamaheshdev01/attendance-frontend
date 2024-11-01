'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, EyeIcon, EyeOffIcon, User, Lock } from 'lucide-react'
import Link from 'next/link'

export default function SignupComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignup = async () => {
    setError('');
    setSuccessMessage('');

    // Basic validation for password confirmation
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/sign`;

    try {
      const response = await fetch(url, {  
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name:fullName, id: parseInt(studentId, 10), password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed! Please check your details.');
      }

      const data = await response.json();
      setSuccessMessage('Signup successful! You can now log in.');

      console.log('Signup successful!', data);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-md transition-all duration-300 ease-in-out hover:shadow-lg border">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <GraduationCap className="w-16 h-16 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Student Signup</CardTitle>
          <CardDescription className="text-center">Create your student account to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <div className="text-red-400 text-center">{error}</div>}
          {successMessage && <div className="text-green-400 text-center">{successMessage}</div>}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <Input 
                id="fullName" 
                placeholder="Enter your full name" 
                required 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
              />
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <div className="relative">
              <Input 
                id="studentId" 
                placeholder="Enter your student ID" 
                required 
                value={studentId} 
                onChange={(e) => setStudentId(e.target.value)} 
              />
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                required
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
              />
              <Button
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                required
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" onClick={handleSignup}>Sign up</Button>
          <div className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link href={'/login'} legacyBehavior>
            <a className="text-primary underline-offset-4 transition-colors hover:underline" href="#">
              Log in here
            </a></Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
