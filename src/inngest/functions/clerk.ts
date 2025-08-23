import { inngest } from "../client";
import { env } from "../../data/env/server";
import { Webhook } from "svix";
import { NonRetriableError } from "inngest";

const verifyWebhook = async ({
  raw,
  headers,
}: {
  raw: string;
  headers: Record<string, string>;
}) => {
  return new Webhook(env.CLERK_WEBHOOK_SECRET).verify(raw, headers);
};

export const clerkCreateUser = inngest.createFunction(
  {
    id: "clerk/create-db-user",
    name: "clerk-create-db-user",
  },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    // verify incoming webhook
    step.run("verify-webhook", async () => {
      try {
        await verifyWebhook({
          raw: event.data.raw,
          headers: event.data.headers as Record<string, string>,
        });
      } catch (error) {
        console.error("Webhook verification failed:", error);
        throw new NonRetriableError("Webhook verification failed");
      }
    });

    // return some response
    return {
      success: true,
      processed: true,
    };
  }
);
