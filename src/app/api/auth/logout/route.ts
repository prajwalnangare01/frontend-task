import { NextResponse } from 'next/server';

/**
 * API route handler for user logout
 * Clears the httpOnly authentication cookie
 */
export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logout successful',
  });

  // Clear the auth token cookie
  response.cookies.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0, // Immediately expire
    path: '/',
  });

  return response;
}

