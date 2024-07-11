import { createClient } from "@/utils/supabase/server";

export async function fetchUserData() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  return data.user;
}
