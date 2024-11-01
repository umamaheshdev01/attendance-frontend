'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, EyeIcon, EyeOffIcon, User } from 'lucide-react'
import Link from 'next/link'
import Cookies from 'js-cookie'

export default function Component() {
  const [showPassword, setShowPassword] = useState(false)
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false) 

  const handleLogin = async () => {
    setError('');
    setIsLoading(true); 
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;

    try {
      const response = await fetch(url, {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: parseInt(studentId, 10), password }),
      });

      if (!response.ok) {
        throw new Error('Login failed! Please check your credentials.');
      }

      const data = await response.json();
      console.log('Login successful!', data);
      
      // Store the accessToken in a cookie for 1 month
      Cookies.set('myclasstoken', data.accessToken, { expires: 30 });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // Set loading state back to false after completion
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-md transition-all duration-300 ease-in-out hover:shadow-lg border">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <GraduationCap className="w-16 h-16 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Student Login</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <div className="text-red-400 text-center">{error}</div>}
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <div className="relative">
              <Input
                id="studentId"
                placeholder="Enter your student ID"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)} // Update studentId state
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
                placeholder="Enter your password"
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
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'} {/* Change button text based on loading state */}
          </Button>
          <div className="text-sm text-center text-gray-500">
            No account?{" "}
            <Link href={'/sign'} legacyBehavior>
              <a className="text-primary underline-offset-4 transition-colors hover:underline" href="#">
                Create here
              </a>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
