import { validUser } from "@/app/validationSchema";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const validation = validUser.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  if (body.password !== body.confirmPassword) {
    return NextResponse.json(
      { error: "Passwords don't match" },
      { status: 406 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 409 }
    );
  }

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
};
