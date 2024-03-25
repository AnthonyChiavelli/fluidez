export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (
    body.username === process.env.NUXT_BASIC_AUTH_USERNAME &&
    body.password === process.env.NUXT_BASIC_AUTH_PASSWORD
  ) {
    setCookie(event, "auth", btoa(`${body.username}:${body.password}`));
    await sendRedirect(event, "/", 200);
  } else {
    await sendRedirect(event, "/login", 401);
  }
});
