// lib/inngest.ts
import { ClerkUserCreatedEventData } from "@/types/clerk";
import { EventSchemas, Inngest } from "inngest";

// Define your events schema
type Events = {
  "clerk/user.created": {
    data: ClerkUserCreatedEventData;
  };
  // Add other events here as needed
};

// Create type-safe Inngest instance
export const inngest = new Inngest({
  id: "CareerConnect",
  schemas: new EventSchemas().fromRecord<Events>(),
});
