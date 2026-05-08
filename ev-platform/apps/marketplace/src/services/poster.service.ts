import { supabase } from "@/utils/supabase/client";

export type MarketplacePoster = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  redirect_url: string | null;
  placement: "home" | "offers" | "banner";
  status: "active" | "inactive";
  start_date: string | null;
  end_date: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export const posterService = {
  async getActivePosters(placement = "home") {
    const today = new Date().toISOString().slice(0, 10);

    const { data, error } = await supabase
      .from("marketplace_posters")
      .select("*")
      .eq("status", "active")
      .eq("placement", placement)
      .or(`start_date.is.null,start_date.lte.${today}`)
      .or(`end_date.is.null,end_date.gte.${today}`)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Unable to load marketplace posters:", error.message);
      return [];
    }

    return (data ?? []) as MarketplacePoster[];
  },

  async listActivePosters(placement = "home") {
    return this.getActivePosters(placement);
  },
};
