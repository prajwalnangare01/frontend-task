// Mark this component for client-side rendering
"use client";

// Import necessary hooks and components from React, Next.js, and other libraries
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

/**
 * The header component for the application.
 * It displays the application title and a user menu with a logout option.
 */
function Header() {
  // Get user email and logout function from the authentication store
  const userEmail = useAuthStore((state) => state.userEmail);
  const logout = useAuthStore((state) => state.logout);
  // Hook to programmatically navigate between pages
  const router = useRouter();

  /**
   * Handles the user logout process.
   * It calls the logout function and redirects the user to the login page.
   */
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <h1 className="text-xl font-bold">Browza</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{userEmail}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

/**
 * The layout component for the main application.
 * It handles authentication checks and provides a consistent layout with a header.
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element | null} The application layout or null if the user is not authenticated.
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get authentication status and check function from the authentication store
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    checkAuth: state.checkAuth,
  }));
  // Hook to programmatically navigate between pages
  const router = useRouter();

  // Effect to check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Effect to redirect to the login page if the user is not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If the user is not authenticated, render nothing (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  // If the user is authenticated, render the layout with the header and main content
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}