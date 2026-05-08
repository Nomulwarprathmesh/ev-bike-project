import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService, getRoleRedirect } from "@/services/auth.service";

export function useSession() {
  return useQuery({
    queryKey: ["auth", "session"],
    queryFn: authService.getSession,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["auth"] }),
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: authService.signup,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => queryClient.clear(),
  });
}

export { getRoleRedirect };
