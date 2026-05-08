import { supabase } from "@/utils/supabase/client";
import type { AppRole, AuthCredentials, SignupInput } from "@/types/auth";

export function getRoleRedirect(role?: AppRole | string | null) {
  if (role === "admin" || role === "super_admin") return "/admin";
  if (role === "vendor") return "/vendor";
  return "/user";
}

export const authService = {
  async signup(input: SignupInput) {
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: {
          name: input.name,
          role: input.role ?? "user",
        },
      },
    });

    if (error) throw error;
    return data;
  },

  async login(input: AuthCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword(input);
    if (error) throw error;
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  async getUserRole() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw error;
    return user?.app_metadata?.role ?? user?.user_metadata?.role ?? "user";
  },
};
