import { VocabEntryType } from "@prisma/client";

export type VocabEntry = {
  english: String;
  spanish: String;
  notes: String;
  vocabEntryType: VocabEntryType;
};
