import { register } from "@/src/lib/auth/authActions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    await register(name, email, password);
    return NextResponse.json({ message: "Inscription réussie !" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 400 });
  }
}
