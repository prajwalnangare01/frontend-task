<<<<<<< HEAD
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
=======
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';

/**
 * Middleware to protect routes server-side.
 * Validates JWT token from httpOnly cookie and redirects unauthenticated users from /dashboard to /login.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the user is trying to access the dashboard
  if (pathname.startsWith('/dashboard')) {
    // Get JWT token from httpOnly cookie
    const token = request.cookies.get('auth-token')?.value;
    
    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // Verify JWT token
    const payload = await verifyToken(token);
    
    // If token is invalid or expired, redirect to login
    if (!payload) {
      const loginUrl = new URL('/login', request.url);
      // Clear invalid token cookie
      const response = NextResponse.redirect(loginUrl);
      response.cookies.set('auth-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
      });
      return response;
    }
  }
  
  return NextResponse.next();
}

// Configure which routes this middleware should run on
export const config = {
  matcher: '/dashboard/:path*',
};

>>>>>>> 451689dd034250e99ab690166c87f1a66b2a3c2a
