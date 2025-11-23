// Mark this component for client-side rendering
"use client";

// Import necessary hooks and components from React, Next.js, and other libraries
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from '@/store/auth';

/**
 * The main login page component.
 * It provides a form for users to enter their credentials and log in.
 */
export default function LoginPage() {
  // State to hold the user's email
  const [email, setEmail] = useState('');
  // State to hold the user's password
  const [password, setPassword] = useState('');
  // State to hold any login error messages
  const [error, setError] = useState('');
  // Function to log in from the authentication store
  const login = useAuthStore((state) => state.login);
  // Hook to programmatically navigate between pages
  const router = useRouter();

  /**
   * Handles the login process when the user clicks the login button.
   * It calls the login function and redirects to the dashboard on success,
   * or displays an error message on failure.
   */
  const handleLogin = async () => {
    setError(''); // Clear any previous errors
    // Attempt to log in with the provided email and password
    const result = await login(email, password);
    // If login is successful, redirect to the dashboard
    if (result.success) {
      router.push('/dashboard');
    } else {
      // Otherwise, set the error message
      setError(result.message || 'An error occurred.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Email input field */}
          <div className="grid gap-2">
            <Input
              id="email"
              type="email"
              placeholder="demo@browza.in"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password input field */}
          <div className="grid gap-2">
            <Input
              id="password"
              type="password"
              required
              placeholder="demo123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Display error message if any */}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}