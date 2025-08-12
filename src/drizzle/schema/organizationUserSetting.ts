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
import { relations } from "drizzle-orm";

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

export const organizationUserSettingsRelation = relations(
  OrganizationUserSettingsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [OrganizationUserSettingsTable.userId],
      references: [usersTable.id],
    }),
    organization: one(organizationsTable, {
      fields: [OrganizationUserSettingsTable.userId],
      references: [organizationsTable.id],
    }),
  })
);
