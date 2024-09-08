import prisma from '@/app/libs/prismadb'
import { hashPassword } from '@/app/libs/bcrypt';
import { signToken } from '@/app/libs/jwt';
import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';


export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      password,
      passwordForUser,
      role,
      checkWalletCount,
      userSystemTime,
      blockchainSelected,
      bnbBalance,
      btcBalance,
      solBalance,
      ethBalance,
      tonBalance,
      trxBalance,
      ltcBalance
    } = await req.json();

    if (!userId || !password || !role) {
      return NextResponse.json({ message: 'UserId, password, or role not provided' }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        userId: userId
      }
    });

    if (existingUser) {
      return NextResponse.json({ message: 'UserId is already in use' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        userId,
        password: hashedPassword,
        passwordForUser, 
        role,
        createdAt: new Date(),
        checkWalletCount: parseInt(checkWalletCount, 10), 
        userSystemTime: parseInt(userSystemTime, 10),     
        blockchainSelected,
        userSystemActive: true,
        bnbBalance: parseFloat(bnbBalance),                
        btcBalance: parseFloat(btcBalance),                
        solBalance: parseFloat(solBalance),                
        ethBalance: parseFloat(ethBalance),                
        tonBalance: parseFloat(tonBalance),                
        trxBalance: parseFloat(trxBalance),                
        ltcBalance: parseFloat(ltcBalance)                 
      }
    });

    const token = signToken(user.id);

    const headers = new Headers();
    headers.append('Set-Cookie', cookie.serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    }));

    return new NextResponse(JSON.stringify({ message: 'User registered successfully', user }), {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('Error in /api/register:', error);
    return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
  }
}
