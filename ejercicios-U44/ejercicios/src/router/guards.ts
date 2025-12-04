import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { getCurrentUser } from "../services/auth.services";

export function roleGuard(allowedRoles: ('Admin'|'Editor'|'Guest')[]) {
  return (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const user = getCurrentUser();
    if (!user.isAuthenticated || !allowedRoles.includes(user.role)) {
      console.log(`Acceso denegado para rol: ${user.role}`);
      next('/');
    } else {
      next();
    }
  }
}