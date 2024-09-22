import { User } from "../store";

export const usePermission = () => {
  const allowedRoles = ["user"];

  const _hasPermission = (user: User | null) => {
    if (user) return allowedRoles.includes(user.role);

    return false;
  };

  return {
    isAllowed: _hasPermission,
  };
};
