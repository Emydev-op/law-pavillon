import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validation for missing fields
    if (!email || !password) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Email and password are required",
          errors: {
            email: !email ? "Email is required" : undefined,
            password: !password ? "Password is required" : undefined,
          },
        },
        { status: 400 }
      );
    }

    // Dummy credential check
    if (email !== "emeka@yopmail.com" || password !== "P@ssword123") {
      return NextResponse.json(
        {
          status: "fail",
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Success response
    return NextResponse.json({
      status: "success",
      message: "Admin logged in successfully",
      data: {
        admin: {
          id: 1,
          name: "Osegbo Emeka",
          email,
          created_at: "2025-05-13T12:37:15.000Z",
          updated_at: "2025-05-13T12:37:15.000Z",
        },
        token: {
          user_id: 1,
          user_type: "admin",
          access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          access_expires_at: "2025-05-13T13:02:42.168Z",
          refresh_expires_at: "2025-05-13T15:26:42.168Z",
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Something went wrong",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
