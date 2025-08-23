// lib/inngest.ts
import { UserWebhookEvent } from "@clerk/nextjs/server";
import { EventSchemas, Inngest } from "inngest";

interface InngestWebhookEventData<E> {
  evt: E;
  headers: Record<string, unknown>; // client_ip, user_agent yahan hoga
  queryParams: Record<string, unknown>;
  raw: string; // Raw body jo Clerk ne bheja
}

// Define your events schema
type Events = {
  "clerk/user.created": {
    data: InngestWebhookEventData<UserWebhookEvent>;
  };
  "clerk/user.updated": {
    data: InngestWebhookEventData<UserWebhookEvent>;
  };
  "clerk/user.deleted": {
    data: InngestWebhookEventData<UserWebhookEvent>;
  };
};

// Create type-safe Inngest instance
export const inngest = new Inngest({
  id: "CareerConnect",
  schemas: new EventSchemas().fromRecord<Events>(),
});
