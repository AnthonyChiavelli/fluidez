const whitelistedRoutes = ["/login", "/api/login"];

export default defineNuxtRouteMiddleware((to) => {
  if (whitelistedRoutes.includes(to.path)) {
    return;
  }
  const authHeader = useCookie("auth");
  if (!authHeader.value) {
    return navigateTo("/login");
  }
  return;
});
