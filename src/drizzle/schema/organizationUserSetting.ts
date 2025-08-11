import {
  pgTable,
  varchar,
  boolean,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import { usersTable } from "./user";
import { organizationsTable } from "./organization";
import { updatedAt, createdAt } from "../schemaHelper";

export const OrganizationUserSettingsTable = pgTable(
  "organization_user_settings",
  {
    userId: varchar()
      .notNull()
      .references(() => usersTable.id),
    organizationId: varchar()
      .notNull()
      .references(() => organizationsTable.id),
    newApplicationEmailNotification: boolean().notNull().default(false),
    minimumRating: integer(),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.userId, table.organizationId] })]
);
