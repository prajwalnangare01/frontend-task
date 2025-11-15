// Mark this component for client-side rendering
"use client";

// Import necessary hooks from React and Next.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * The root page component of the application.
 * Its primary purpose is to redirect the user to the login page.
 */
export default function RootPage() {
  // Hook to programmatically navigate between pages
  const router = useRouter();

  // Effect to redirect the user to the login page on component mount
  useEffect(() => {
    router.push('/login');
  }, [router]);

  // This component does not render any UI, so it returns null
  return null;
}