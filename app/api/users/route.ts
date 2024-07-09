import {
  validDelete,
  validUpdateUser,
  validUser,
} from "@/app/validationSchema";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const userMail = searchParams.get("userMail");

  if (!userMail) {
    return NextResponse.json(
      { error: "Missing required query parameter" },
      { status: 400 }
    );
  }

  const res = await prisma.user.findUnique({
    where: { email: userMail },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return NextResponse.json(res, { status: 200 });
};

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
      authMethod: body.authMethod,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
};

export const PUT = async (req: NextRequest) => {
  const body = await req.json();
  const validation = validUpdateUser.safeParse(body);

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
    where: { id: body.id },
  });

  if (!existingUser) {
    return NextResponse.json(
      { error: "This user doesn't exist" },
      { status: 404 }
    );
  }

  const updateUser = await prisma.user.update({
    data: { name: body.name, password: body.password },
    where: { id: body.id },
  });

  return NextResponse.json(updateUser, { status: 201 });
};

export const DELETE = async (req: NextRequest) => {
  const body = await req.json();
  const validation = validDelete.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const existingSession = await prisma.user.findFirst({
    where: { id: body.id },
  });

  if (!existingSession) {
    return NextResponse.json({ error: "User doesn't exist" }, { status: 404 });
  }

  const deleteSession = await prisma.user.delete({
    where: { id: body.id },
  });

  return NextResponse.json(deleteSession, { status: 200 });
};
