import { pgTable, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "../schema";
import { createdAt, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";

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

export const usersResumeRelation = relations(UserResumeTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [UserResumeTable.userId],
    references: [usersTable.id],
  }),
}));
