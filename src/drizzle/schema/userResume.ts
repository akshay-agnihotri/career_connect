import { pgTable, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "../schema";
import { createdAt, updatedAt } from "../schemaHelper";

export const UserResumeTable = pgTable("user_resumes", {
  userId: varchar()
    .primaryKey()
    .references(() => usersTable.id),
  resumeFileUrl: varchar().notNull(),
  resumeFileKey: varchar().notNull(),
  aiSummary: varchar(),
  createdAt,
  updatedAt,
});
