import prisma from "~/server/data/prisma";

export default defineEventHandler(async (event) => {
  const vocabId = getRouterParam(event, "vocabId");
  try {
    await prisma.vocabEntry.delete({
      where: {
        id: vocabId,
      },
    });
    return "Success";
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});

// TODO https://unjs.io/blog/2023-08-15-h3-towards-the-edge-of-the-web#runtime-type-safe-request-utils
