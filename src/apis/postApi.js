import { supabase } from "../libs/supabase";

export const fetchPosts = async (page = 1, limit = 20) => {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase 환경 변수를 설정해주세요. (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)"
    );
  }

  const offset = (page - 1) * limit;

  const { data, count, error } = await supabase
    .from("posts")
    .select(
      `
      id, title, content, created_at,
      users(email)
    `
    )
    .order("id", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(error.message);
  }

  return {
    posts: data ?? [],
    totalCount: count ?? 0,
  };
};

export const fetchUserPosts = async (userId, page = 1, limit = 20) => {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase 환경 변수를 설정해주세요. (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)"
    );
  }

  const offset = (page - 1) * limit;

  const { data, count, error } = await supabase
    .from("posts")
    .select(
      `
      id, title, content, created_at,
      users(email)
    `
    )
    .eq("user_id", userId)
    .order("id", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(error.message);
  }

  return {
    posts: data ?? [],
    totalCount: count ?? 0,
  };
};
