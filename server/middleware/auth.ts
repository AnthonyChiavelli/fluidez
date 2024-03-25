const whitelistedRoutes = ["/login", "/api/login"];

export default defineEventHandler(async (event) => {
  if (whitelistedRoutes.includes(event.node.req.url || "")) {
    return;
  }

  const cookie = getCookie(event, "auth");
  try {
    if (cookie) {
      const decodedCookie = atob(cookie);
      const [username, password] = decodedCookie.split(":");
      if (username === process.env.NUXT_BASIC_AUTH_USERNAME && password === process.env.NUXT_BASIC_AUTH_PASSWORD) {
        return;
      }
    }
  } catch (e) {
    return await sendRedirect(event, "/login", 401);
  }
  return await sendRedirect(event, "/login", 401);
});
