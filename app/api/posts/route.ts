import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Handle GET requests - Fetch all posts
export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  // Sorting by created_at in descending order

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(
    { message: "Posts Route Accessed Successfully!", data },
    { status: 200 }
  );
}

// Handle POST requests - Create a new post
export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { title, body, author } = await req.json();

  // Get the current user
  const { data: authInfo, error: userError } = await supabase.auth.getUser();
  if (userError || !authInfo) {
    return NextResponse.json(
      { error: userError?.message || "User not found" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title,
      body,
      author,
      author_email: authInfo.user.email, // Use the logged-in user's email
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

// Handle PUT requests - Update an existing post
export async function PUT(req: NextRequest) {
  const supabase = createClient();
  const { id, title, body, author } = await req.json();

  // Get the current user
  const { data: authInfo, error: userError } = await supabase.auth.getUser();
  if (userError || !authInfo) {
    return NextResponse.json(
      { error: userError?.message || "User not found" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("posts")
    .update({
      title,
      body,
      author,
      author_email: authInfo.user.email, // Use the logged-in user's email
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

// Handle DELETE requests - Delete a post
export async function DELETE(req: NextRequest) {
  const supabase = createClient();
  const { id } = await req.json();

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(
    { message: "Post deleted successfully" },
    { status: 200 }
  );
}
