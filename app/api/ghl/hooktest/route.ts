import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json(
    { message: "GET request successful" },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    console.log("Received data:", data);

    return NextResponse.json(
      { message: "Data received successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error receiving data:", error);

    return NextResponse.json(
      { error: "Failed to receive data" },
      { status: 400 }
    );
  }
}
