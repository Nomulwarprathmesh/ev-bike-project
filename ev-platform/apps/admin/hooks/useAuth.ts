import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService, getRoleRedirect } from "@/services/auth.service";
import type { AuthCredentials, SignupInput } from "@/types/auth";

export function useSession() {
  return useQuery({
    queryKey: ["auth", "session"],
    queryFn: authService.getSession,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: AuthCredentials) => authService.login(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: (input: SignupInput) => authService.signup(input),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export { getRoleRedirect };
