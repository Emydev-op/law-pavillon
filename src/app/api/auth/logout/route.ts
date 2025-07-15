import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({
      status: "success",
      message: "Admin logged out successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to logout",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
