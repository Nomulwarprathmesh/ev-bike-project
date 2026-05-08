import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { posterService, type CreatePosterInput, type PosterPlacement, type UpdatePosterInput } from "@/services/poster.service";

export const posterKeys = {
  all: ["marketplace-posters"] as const,
  active: (placement: PosterPlacement) => ["marketplace-posters", "active", placement] as const,
};

export function useAdminPosters() {
  return useQuery({
    queryKey: posterKeys.all,
    queryFn: posterService.getAdminPosters,
  });
}

export function usePosters() {
  return useAdminPosters();
}

export function useActivePosters(placement: PosterPlacement = "home") {
  return useQuery({
    queryKey: posterKeys.active(placement),
    queryFn: () => posterService.getActivePosters(placement),
  });
}

export function useCreatePoster() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePosterInput) => posterService.createPoster(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: posterKeys.all });
    },
  });
}

export function useDeletePoster() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => posterService.deletePoster(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: posterKeys.all });
    },
  });
}

export function useUpdatePoster() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdatePosterInput) => posterService.updatePoster(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: posterKeys.all });
    },
  });
}
