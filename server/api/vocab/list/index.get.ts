import prisma from "~/server/data/prisma";

export default defineEventHandler(async () => {
  const vocabEntries = await prisma.vocabEntry.findMany();
  return { vocabEntries };
});

// TODO https://unjs.io/blog/2023-08-15-h3-towards-the-edge-of-the-web#runtime-type-safe-request-utils
