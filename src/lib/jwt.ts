import { SignJWT, jwtVerify } from 'jose';

// Secret key for JWT signing - in production, use an environment variable
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production-min-32-chars'
);

// Token expiration time (24 hours)
const EXPIRATION_TIME = '24h';

export interface JWTPayload {
  email: string;
  iat?: number;
  exp?: number;
}

/**
 * Generates a JWT token for the authenticated user
 * @param email - User's email address
 * @returns JWT token string
 */
export async function generateToken(email: string): Promise<string> {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(EXPIRATION_TIME)
    .sign(SECRET_KEY);

  return token;
}

/**
 * Verifies and decodes a JWT token
 * @param token - JWT token string
 * @returns Decoded payload or null if invalid
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    // Type assertion with proper checking
    if (payload && typeof payload === 'object' && 'email' in payload) {
      return {
        email: payload.email as string,
        iat: payload.iat as number | undefined,
        exp: payload.exp as number | undefined,
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

