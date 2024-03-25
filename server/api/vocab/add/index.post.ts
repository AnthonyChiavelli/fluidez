import { VocabEntryType } from "@prisma/client";
import prisma from "~/server/data/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (await prisma.vocabEntry.findFirst({ where: { spanish: body.spanish } })) {
    throw createError({
      statusCode: 400,
      statusMessage: "Already exists",
      data: {
        code: "ALREADY_EXISTS",
      },
    });
  }
  const res = await prisma.vocabEntry.create({
    data: {
      english: body.english,
      spanish: body.spanish,
      notes: body.notes,
      vocabEntryType: body.vocabEntryType as VocabEntryType,
    },
  });
  return res;
});

// TODO https://unjs.io/blog/2023-08-15-h3-towards-the-edge-of-the-web#runtime-type-safe-request-utils
