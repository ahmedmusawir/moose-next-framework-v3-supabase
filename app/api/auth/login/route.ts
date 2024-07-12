import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Testing the route
export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(
    { message: "Auth login Route Accessed Successfully!" },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
