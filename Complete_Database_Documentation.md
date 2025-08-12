# 🚀 Career Connect - Complete Database Architecture (Hinglish Guide)

## Overview

Yeh project ek comprehensive job board application hai jo Next.js, Drizzle ORM aur PostgreSQL use karta hai. Database schema completely production-ready hai with proper relationships, type safety, aur modern features.

## 🛠 Tech Stack

- **Next.js**: Frontend + Backend (App Router)
- **Drizzle ORM**: Type-safe database operations
- **PostgreSQL**: Main database with advanced features
- **Docker**: Database containerization
- **TypeScript**: Full type safety
- **Zod**: Environment validation

## 📦 Installation Commands

### Main Dependencies

```bash
npm i drizzle-orm pg @t3-oss/env-nextjs
```

### Dev Dependencies

```bash
npm i -D drizzle-kit @types/pg
npm i zod
```

## 🗂 Complete Drizzle Folder Structure

```
src/drizzle/
├── db.ts                           # Database connection setup
├── schema.ts                       # All schemas export file
├── schemaHelper.ts                 # Reusable common fields
└── schema/
    ├── user.ts                     # Users table + relations
    ├── organization.ts             # Organizations/Companies table + relations
    ├── jobListing.ts              # Job postings with enums + relations
    ├── jobListingApplication.ts   # Job applications tracking + relations
    ├── userResume.ts              # User resume files + relations
    ├── userNotificationSettings.ts # User notification preferences + relations
    └── organizationUserSetting.ts # Company-specific HR settings + relations
```

---

## 🏗 Core Setup Files

### 1. Database Connection (db.ts)

```typescript
import { env } from "@/data/env/server";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export const db = drizzle(env.DATABASE_URL, {
  schema,
});
```

**Purpose**: Main database connection jo environment variables use karta hai. Saare schemas include hain relations ke saath.

### 2. Schema Helper (schemaHelper.ts)

```typescript
import { timestamp, uuid } from "drizzle-orm/pg-core";

export const createdAt = timestamp({ withTimezone: true })
  .notNull()
  .defaultNow();
export const updatedAt = timestamp({ withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const id = uuid().primaryKey().defaultRandom();
```

**Purpose**: Common fields jo har table me reuse hote hain

- **createdAt**: Record create time automatic
- **updatedAt**: Update time automatic
- **id**: UUID primary key for modern tables

### 3. Schema Exports (schema.ts)

```typescript
export * from "./schema/user";
export * from "./schema/organization";
export * from "./schema/jobListing";
export * from "./schema/jobListingApplication";
export * from "./schema/userResume";
export * from "./schema/userNotificationSettings";
export * from "./schema/organizationUserSetting";
```

**Purpose**: Central export file - sab schemas ek jagah se import kar sakte ho

---

## 👥 Table Schemas with Relations (Detailed)

### 1. Users Table (user.ts)

```typescript
export const usersTable = pgTable("users", {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  imageUrl: varchar().notNull(),
  email: varchar().notNull().unique(),
  createdAt,
  updatedAt,
});

export const usersRelation = relations(usersTable, ({ one, many }) => ({
  notificationSettings: one(UserNotificationSettingsTable),
  resume: one(UserResumeTable),
  organizationUserSettings: many(OrganizationUserSettingsTable),
}));
```

**Purpose**: Main users table - job seekers aur recruiters dono
**Relations**:

- **notificationSettings**: User ke notification preferences (one-to-one)
- **resume**: User ka uploaded resume (one-to-one)
- **organizationUserSettings**: Multiple companies me HR settings (one-to-many)

### 2. Organizations Table (organization.ts)

```typescript
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
```

**Purpose**: Companies/Organizations ka data
**Relations**:

- **jobListings**: Company ki saari job postings (one-to-many)
- **organizationUserSettings**: Company ke HR users settings (one-to-many)

### 3. Job Listings Table (jobListing.ts) - Complex Schema

```typescript
// 5 PostgreSQL Enums for job properties
export const wageIntervals = ["hourly", "yearly"] as const;
export const locationRequirements = ["remote", "on-site", "hybrid"] as const;
export const experienceLevels = ["junior", "mid-level", "senior"] as const;
export const jobListingStatuses = ["draft", "published", "delisted"] as const;
export const jobListingTypes = [
  "internship",
  "part-time",
  "full-time",
] as const;

export const jobListingsTable = pgTable(
  "job_listings",
  {
    id: id, // UUID from schemaHelper
    organizationId: varchar()
      .references(() => organizationsTable.id, { onDelete: "cascade" })
      .notNull(),
    title: varchar().notNull(),
    description: text().notNull(),
    wage: integer(),
    wageInterval: wageIntervalEnum(),
    stateAbbreviation: varchar(),
    city: varchar(),
    isFeatured: boolean().notNull().default(false),
    locationRequirement: locationRequirementEnum().notNull(),
    experienceLevel: experienceLevelEnum().notNull(),
    status: jobListingStatusEnum().notNull().default("draft"),
    type: jobListingTypeEnum().notNull(),
    postedAt: timestamp({ withTimezone: true }),
    createdAt,
    updatedAt,
  },
  (table) => [index().on(table.stateAbbreviation)]
);

export const jobListingReferences = relations(
  jobListingsTable,
  ({ one, many }) => ({
    organization: one(organizationsTable, {
      fields: [jobListingsTable.organizationId],
      references: [organizationsTable.id],
    }),
    applications: many(jobListingApplicationsTable),
  })
);
```

**Purpose**: Complete job posting system
**Key Features**:

- **5 Enums**: Proper PostgreSQL enums for type safety
- **Flexible Location**: Remote/On-site/Hybrid support
- **Salary System**: Hourly/Yearly with optional wage
- **Status Management**: Draft → Published → Delisted
- **Featured Jobs**: Premium job highlighting
- **Search Index**: State-wise fast searching

**Relations**:

- **organization**: Job kis company ne post ki (many-to-one)
- **applications**: Job pe kitni applications aayi (one-to-many)

### 4. Job Applications Table (jobListingApplication.ts)

```typescript
export const applicationStages = [
  "denied",
  "applied",
  "interested",
  "interviewed",
  "hired",
] as const;

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

export const jobListingApplicationsRelation = relations(
  jobListingApplicationsTable,
  ({ one }) => ({
    jobListing: one(jobListingsTable, {
      fields: [jobListingApplicationsTable.jobListingId],
      references: [jobListingsTable.id],
    }),
    user: one(usersTable, {
      fields: [jobListingApplicationsTable.userId],
      references: [usersTable.id],
    }),
  })
);
```

**Purpose**: Complete application tracking system
**Key Features**:

- **Composite Primary Key**: (jobListingId + userId) - ek user ek job pe sirf ek baar apply kar sakta hai
- **Application Pipeline**: denied → applied → interested → interviewed → hired
- **Cover Letter**: Optional personal message
- **Rating System**: Employer feedback
- **Stage Tracking**: Complete hiring process

**Relations**:

- **jobListing**: Application kis job ke liye hai
- **user**: Applicant ka details

### 5. User Resume Table (userResume.ts)

```typescript
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
```

**Purpose**: Resume file management with AI features
**Key Features**:

- **File Storage**: URL aur Key for cloud storage (S3, etc.)
- **AI Summary**: Automatic resume summarization
- **One Resume Per User**: Primary key constraint

### 6. User Notification Settings (userNotificationSettings.ts)

```typescript
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

export const usersNotificationSettingsRelation = relations(
  UserNotificationSettingsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [UserNotificationSettingsTable.userId],
      references: [usersTable.id],
    }),
  })
);
```

**Purpose**: Personalized notification preferences
**Key Features**:

- **Email Control**: Job notifications on/off
- **AI Prompts**: Custom job matching criteria
- **Default Off**: Privacy-first approach

### 7. Organization User Settings (organizationUserSetting.ts)

```typescript
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
      fields: [OrganizationUserSettingsTable.organizationId],
      references: [organizationsTable.id],
    }),
  })
);
```

**Purpose**: Company-specific HR settings
**Key Features**:

- **Multi-Company Support**: Ek user multiple companies me HR ho sakta hai
- **Application Notifications**: New applications ki email alerts
- **Rating Filter**: Minimum candidate rating requirement
- **Composite Key**: (userId + organizationId)

---

## 🔗 Complete Relationship Map

```
Users (1) ←→ (1) UserNotificationSettings
Users (1) ←→ (1) UserResume
Users (1) ←→ (M) OrganizationUserSettings
Users (1) ←→ (M) JobApplications

Organizations (1) ←→ (M) JobListings
Organizations (1) ←→ (M) OrganizationUserSettings

JobListings (1) ←→ (M) JobApplications
JobListings (M) ←→ (1) Organizations

JobApplications (M) ←→ (1) Users
JobApplications (M) ←→ (1) JobListings
```

## ✨ Production Ready Features

### Database Level

- ✅ **PostgreSQL Enums**: Type-safe enums at database level
- ✅ **Foreign Keys**: Proper relationships with cascade delete
- ✅ **Indexes**: Performance optimization for searches
- ✅ **Composite Keys**: Complex relationships support
- ✅ **UUID Support**: Modern primary keys

### Application Level

- ✅ **Type Safety**: Full TypeScript integration
- ✅ **Relations**: Easy join queries with Drizzle
- ✅ **File Management**: Resume upload with cloud storage
- ✅ **AI Integration**: Resume summaries & job matching
- ✅ **Notification System**: Granular email controls
- ✅ **Multi-tenancy**: Multi-company HR support

### Business Logic

- ✅ **Complete Job Board**: Post, apply, track, hire
- ✅ **Application Pipeline**: Full hiring process
- ✅ **Rating System**: Candidate feedback
- ✅ **Featured Jobs**: Premium job promotion
- ✅ **Location Flexibility**: Remote/Hybrid/On-site
- ✅ **Experience Levels**: Junior to Senior filtering

## 🚀 Next Steps for Implementation

1. **Run Migrations**: Generate and apply database migrations
2. **API Development**: Create Next.js API routes using db connections
3. **Frontend Components**: Build UI components for job board
4. **Authentication**: Add user login/signup system
5. **File Upload**: Implement resume upload functionality
6. **Email System**: Setup notification email service
7. **AI Integration**: Add resume parsing and job matching

Database schema ab completely production-ready hai! Koi bhi modern job board feature implement kar sakte ho is foundation pe.

---

_Yeh file personal understanding ke liye hai - detailed Hinglish documentation for easy future reference._
