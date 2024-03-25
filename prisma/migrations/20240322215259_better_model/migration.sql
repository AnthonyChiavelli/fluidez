/*
  Warnings:

  - You are about to drop the `Definition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Phrase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Word` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToPhrase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToWord` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "VocabEntryType" AS ENUM ('Word', 'Phrase');

-- CreateEnum
CREATE TYPE "PartOfSpeech" AS ENUM ('Noun', 'Verb', 'Adjective', 'Adverb', 'Pronoun', 'Preposition', 'Conjunction', 'Interjection');

-- DropForeignKey
ALTER TABLE "Definition" DROP CONSTRAINT "Definition_wordId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPhrase" DROP CONSTRAINT "_CategoryToPhrase_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPhrase" DROP CONSTRAINT "_CategoryToPhrase_B_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToWord" DROP CONSTRAINT "_CategoryToWord_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToWord" DROP CONSTRAINT "_CategoryToWord_B_fkey";

-- DropTable
DROP TABLE "Definition";

-- DropTable
DROP TABLE "Phrase";

-- DropTable
DROP TABLE "Word";

-- DropTable
DROP TABLE "_CategoryToPhrase";

-- DropTable
DROP TABLE "_CategoryToWord";

-- CreateTable
CREATE TABLE "VocabEntry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "english" TEXT NOT NULL,
    "spanish" TEXT NOT NULL,
    "notes" TEXT,
    "vocabEntryType" "VocabEntryType" NOT NULL,
    "partOfSpeech" "PartOfSpeech",

    CONSTRAINT "VocabEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToVocabEntry" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToVocabEntry_AB_unique" ON "_CategoryToVocabEntry"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToVocabEntry_B_index" ON "_CategoryToVocabEntry"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToVocabEntry" ADD CONSTRAINT "_CategoryToVocabEntry_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToVocabEntry" ADD CONSTRAINT "_CategoryToVocabEntry_B_fkey" FOREIGN KEY ("B") REFERENCES "VocabEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
