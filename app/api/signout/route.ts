import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function POST() {
  try {
    const headers = new Headers();
    headers.append('Set-Cookie', cookie.serialize('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1,
      path: '/',
    }));

    return new NextResponse(JSON.stringify({ message: 'Signed out successfully' }), {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Error in /api/signout:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
