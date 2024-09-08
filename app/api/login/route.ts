import prisma from '@/app/libs/prismadb'
import { verifyPassword } from '@/app/libs/bcrypt';
import { signToken } from '@/app/libs/jwt';
import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';



export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ message: 'Şifre sağlanmadı' }, { status: 400 });
    }
    const users = await prisma.user.findMany();
    
    let user = null;
    for (const u of users) {
      if (await verifyPassword(password, u.password)) {
        user = u;
        break;
      }
    }

    if (!user) {
      console.warn('Şifre ile kullanıcı bulunamadı');
      return NextResponse.json({ message: 'Geçersiz kimlik bilgileri' }, { status: 401 });
    }

    const token = signToken(user.id);

    const headers = new Headers();
    headers.append('Set-Cookie', cookie.serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    }));

    return new NextResponse(JSON.stringify({ message: 'Giriş başarılı', user }), {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('Hata /api/login:', error);
    return NextResponse.json({ message: 'Sunucu hatası', error }, { status: 500 });
  }
}
