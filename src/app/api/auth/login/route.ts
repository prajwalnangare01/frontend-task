import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/jwt';

/**
 * API route handler for user login
 * Validates credentials and sets httpOnly cookie with JWT token
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check credentials (for demo purposes - hardcoded)
    // In production, this would query a database
    if (email === 'demo@browza.in' && password === 'demo123') {
      // Generate JWT token
      const token = await generateToken(email);

      // Create response with success message
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        user: { email },
      });

      // Set httpOnly cookie with JWT token
      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours in seconds
        path: '/',
      });

      return response;
    }

    // Invalid credentials
    return NextResponse.json(
      { success: false, message: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}

