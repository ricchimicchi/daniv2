import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export function signToken(userId: string) {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '30d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY) as {
        role: string; userId: string 
};
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}


