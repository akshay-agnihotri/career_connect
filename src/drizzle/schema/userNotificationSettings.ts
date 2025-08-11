import { pgTable, varchar, boolean } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelper";
import { usersTable } from "./user";

export const UserNotificationSettingsTable = pgTable(
  "user_notification_settings",
  {
    userId: varchar()
      .primaryKey()
      .references(() => usersTable.id),
    newJobEmailNotifications: boolean().notNull().default(false),
    aiPrompt: varchar(),
    createdAt,
    updatedAt,
  }
);
