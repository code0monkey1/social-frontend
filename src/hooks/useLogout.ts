import { useMutation } from "@tanstack/react-query";
import { logoutFromServer } from "../http/api";
import { useAuthStore } from "../store";

export const useLogout = () => {
  const { logout } = useAuthStore();

  const { mutate: logOut } = useMutation({
    mutationFn: logoutFromServer,
    mutationKey: ["logout"],
    onSuccess: () => {
      logout();
    },
  });

  return { logOut };
};
