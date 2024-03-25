import prisma from "~/server/data/prisma";

export default defineEventHandler(async (event) => {
  const word = getRouterParam(event, "word");
  try {
    const vocabEntry = await prisma.vocabEntry.findFirst({
      where: {
        spanish: decodeURIComponent(word.replace(/-/g, " ")),
      },
    });
    return vocabEntry;
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});

// TODO https://unjs.io/blog/2023-08-15-h3-towards-the-edge-of-the-web#runtime-type-safe-request-utils
