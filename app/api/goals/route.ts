import { validGoal, validUpdateGoal } from "@/app/validationSchema";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing required query parameter" },
      { status: 400 }
    );
  }

  const res = await prisma.goals.findFirst({
    where: { userId: userId },
  });

  return NextResponse.json(res, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const validation = validGoal.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const existingGoal = await prisma.goals.findFirst({
      where: { userId: body.userId },
    });

    if (existingGoal) {
      return NextResponse.json(
        { error: "Goal already exist" },
        { status: 409 }
      );
    }

    const newGoal = await prisma.goals.create({
      data: {
        userId: body.userId,
        duration: body.duration,
        actual: body.actual,
      },
    });

    return NextResponse.json(newGoal, { status: 201 });
  } catch (e) {
    console.log(e);
  }
};

export const PUT = async (req: NextRequest) => {
  const body = await req.json();
  const validation = validUpdateGoal.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const existingGoal = await prisma.goals.findFirst({
    where: {
      userId: body.userId,
    },
  });

  if (!existingGoal) {
    return NextResponse.json({ error: "Goal doesn't exist" }, { status: 404 });
  }

  const modifyGoal = await prisma.goals.update({
    where: {
      id: body.id,
    },
    data: {
      duration: body.duration,
      actual: body.actual,
    },
  });

  return NextResponse.json(modifyGoal, { status: 201 });
};
