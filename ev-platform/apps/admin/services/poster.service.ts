import { supabase } from "@/utils/supabase/client";

export type PosterPlacement = "home" | "offers" | "banner";
export type PosterStatus = "active" | "inactive";

export type MarketplacePoster = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  redirect_url: string | null;
  placement: PosterPlacement;
  status: PosterStatus;
  start_date: string | null;
  end_date: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type CreatePosterInput = {
  title: string;
  description?: string;
  image: File;
  redirect_url?: string;
  placement: PosterPlacement;
  status: PosterStatus;
  start_date?: string;
  end_date?: string;
};

export type UpdatePosterInput = Partial<Omit<CreatePosterInput, "image">> & {
  id: string;
  image?: File;
};

const POSTER_BUCKET = "marketplace-posters";

function normalizeNullable(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

function toPosterError(error: unknown, fallback: string) {
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes("Could not find the table") || message.includes("relation") || message.includes("42P01")) {
    return new Error("Supabase table marketplace_posters does not exist. Apply the poster SQL migration first.");
  }

  if (message.toLowerCase().includes("bucket") || message.includes("StorageApiError")) {
    return new Error("Supabase Storage bucket marketplace-posters is missing or blocked by policy. Create the bucket and apply storage RLS policies.");
  }

  return new Error(message || fallback);
}

export const posterService = {
  async getAdminPosters() {
    const { data, error } = await supabase
      .from("marketplace_posters")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw toPosterError(error, "Unable to load posters.");
    return (data ?? []) as MarketplacePoster[];
  },

  async listPosters() {
    return this.getAdminPosters();
  },

  async getActivePosters(placement: PosterPlacement = "home") {
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from("marketplace_posters")
      .select("*")
      .eq("status", "active")
      .eq("placement", placement)
      .or(`start_date.is.null,start_date.lte.${today}`)
      .or(`end_date.is.null,end_date.gte.${today}`)
      .order("created_at", { ascending: false });

    if (error) throw toPosterError(error, "Unable to load active posters.");
    return (data ?? []) as MarketplacePoster[];
  },

  async uploadPosterImage(file: File) {
    const filePath = `posters/${Date.now()}-${sanitizeFileName(file.name)}`;

    const { error } = await supabase.storage
      .from(POSTER_BUCKET)
      .upload(filePath, file, {
        cacheControl: "31536000",
        upsert: false,
      });

    if (error) throw toPosterError(error, "Unable to upload poster image.");

    const { data } = supabase.storage.from(POSTER_BUCKET).getPublicUrl(filePath);
    return data.publicUrl;
  },

  async createPoster(input: CreatePosterInput) {
    const imageUrl = await this.uploadPosterImage(input.image);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("marketplace_posters")
      .insert({
        title: input.title.trim(),
        description: normalizeNullable(input.description),
        image_url: imageUrl,
        redirect_url: normalizeNullable(input.redirect_url),
        placement: input.placement,
        status: input.status,
        start_date: normalizeNullable(input.start_date),
        end_date: normalizeNullable(input.end_date),
        created_by: user?.id ?? null,
      })
      .select("*")
      .single();

    if (error) throw toPosterError(error, "Unable to save poster.");
    return data as MarketplacePoster;
  },

  async updatePoster(input: UpdatePosterInput) {
    const imageUrl = input.image ? await this.uploadPosterImage(input.image) : undefined;
    const updates: Record<string, unknown> = {};

    if (input.title !== undefined) updates.title = input.title.trim();
    if (input.description !== undefined) updates.description = normalizeNullable(input.description);
    if (input.redirect_url !== undefined) updates.redirect_url = normalizeNullable(input.redirect_url);
    if (input.placement !== undefined) updates.placement = input.placement;
    if (input.status !== undefined) updates.status = input.status;
    if (input.start_date !== undefined) updates.start_date = normalizeNullable(input.start_date);
    if (input.end_date !== undefined) updates.end_date = normalizeNullable(input.end_date);
    if (imageUrl) updates.image_url = imageUrl;

    const { data, error } = await supabase
      .from("marketplace_posters")
      .update(updates)
      .eq("id", input.id)
      .select("*")
      .single();

    if (error) throw toPosterError(error, "Unable to update poster.");
    return data as MarketplacePoster;
  },

  async deletePoster(id: string) {
    const { error } = await supabase.from("marketplace_posters").delete().eq("id", id);
    if (error) throw toPosterError(error, "Unable to delete poster.");
  },
};
