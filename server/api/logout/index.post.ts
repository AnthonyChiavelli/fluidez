export default defineEventHandler(async (event) => {
  deleteCookie(event, "auth");
  return await sendRedirect(event, "/login", 200);
});
