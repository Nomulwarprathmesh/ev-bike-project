import { useQuery } from "@tanstack/react-query";
import { posterService } from "@/services/poster.service";

export function usePosters(placement = "home") {
  return useActivePosters(placement);
}

export function useActivePosters(placement = "home") {
  return useQuery({
    queryKey: ["marketplace-posters", placement],
    queryFn: () => posterService.getActivePosters(placement),
  });
}
