import {
  pgTable,
  uuid,
  varchar,
  integer,
  primaryKey,
  pgEnum,
} from "drizzle-orm/pg-core";
import { jobListingsTable } from "./jobListing";
import { usersTable } from "./user";
import { updatedAt, createdAt } from "../schemaHelper";

export const applicationStages = [
  "denied",
  "applied",
  "interested",
  "interviewed",
  "hired",
] as const;
export type ApplicationStage = (typeof applicationStages)[number];
export const applicationStageEnum = pgEnum(
  "application_stage",
  applicationStages
);

export const jobListingApplicationsTable = pgTable(
  "job_listing_applications",
  {
    jobListingId: uuid()
      .references(() => jobListingsTable.id, { onDelete: "cascade" })
      .notNull(),
    userId: varchar()
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),
    coverLetter: varchar(),
    rating: integer(),
    stage: applicationStageEnum().notNull().default("applied"),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.jobListingId, table.userId] })]
);
