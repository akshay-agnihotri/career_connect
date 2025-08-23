import { UserJSON } from "@clerk/nextjs/server";

// Clean webhook event structure
export interface ClerkUserWebhookEvent {
  data: UserJSON;
  object: "event";
  type: "user.created" | "user.updated" | "user.deleted";
  timestamp: number;
  instance_id: string;
}

// HTTP request info headers me milti hai
export interface ClerkUserCreatedEventData {
  evt: ClerkUserWebhookEvent;
  headers: Record<string, unknown>; // client_ip, user_agent yahan hoga
  queryParams: Record<string, unknown>;
  raw: string; // Raw body jo Clerk ne bheja
}
