import {
  validDelete,
  validSession,
  validUpdateSession,
} from "@/app/validationSchema";
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

  const res = await prisma.sessions.findMany({
    where: { userId: userId },
  });

  return NextResponse.json(res, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const validation = validSession.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  let res;
  const dateTime = new Date();

  try {
    if (!body.beginTime) {
      const isStarted = await prisma.sessions.findFirst({
        where: { status: false },
      });
      if (isStarted) {
        return NextResponse.json("A session is already started", {
          status: 400,
        });
      }
      res = await prisma.sessions.create({
        data: {
          userId: body.userId,
          beginTime:
            dateTime.getHours() +
            ":" +
            dateTime.getMinutes() +
            ":" +
            dateTime.getSeconds(),
          status: false,
          day:
            dateTime.getDay() +
            "/" +
            dateTime.getMonth() +
            "/" +
            dateTime.getFullYear(),
        },
      });
    } else {
      res = await prisma.sessions.create({
        data: {
          userId: body.userId,
          beginTime: body.beginTime,
          endTime: body.endTime,
          totalTime: body.totalTime,
          day: body.day,
          status: true,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }

  return NextResponse.json(res, { status: 201 });
};

export const PUT = async (req: NextRequest) => {
  const body = await req.json();
  const validation = validUpdateSession.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const existingSession = await prisma.sessions.findFirst({
      where: { id: body.id },
    });

    if (!existingSession) {
      return NextResponse.json(
        { error: "Session doesn't exist" },
        { status: 404 }
      );
    }

    const res = await prisma.sessions.update({
      where: { id: body.id },
      data: {
        beginTime: body.beginTime,
        endTime: body.endTime,
        totalTime: body.totalTime,
        day: body.day,
        status: body.status,
      },
    });

    return NextResponse.json(res, { status: 201 });
  } catch (e) {
    console.log(e);
  }
};

export const DELETE = async (req: NextRequest) => {
  const body = await req.json();
  const validation = validDelete.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const existingSession = await prisma.sessions.findFirst({
    where: { id: body.id },
  });

  if (!existingSession) {
    return NextResponse.json(
      { error: "Session doesn't exist" },
      { status: 404 }
    );
  }

  const deleteSession = await prisma.sessions.delete({
    where: { id: body.id },
  });

  return NextResponse.json(deleteSession, { status: 200 });
};
