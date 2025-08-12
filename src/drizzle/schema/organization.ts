import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";
import { jobListingsTable, OrganizationUserSettingsTable } from "../schema";

export const organizationsTable = pgTable("organizations", {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  imageUrl: varchar(),
  createdAt,
  updatedAt,
});

export const organizationRelations = relations(
  organizationsTable,
  ({ many }) => ({
    jobListings: many(jobListingsTable),
    organizationUserSettings: many(OrganizationUserSettingsTable),
  })
);
