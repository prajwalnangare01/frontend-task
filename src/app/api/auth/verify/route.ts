import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

/**
 * API route handler to verify authentication status
 * Returns user info if token is valid
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: { email: payload.email },
    });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}

