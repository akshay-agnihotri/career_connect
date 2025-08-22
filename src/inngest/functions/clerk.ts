import { inngest } from "../client";
import { env } from "../../data/env/server";
import { Webhook } from "svix";

export const clerkCreateUser = inngest.createFunction(
  {
    id: "clerk/create-db-user",
    name: "clerk-create-db-user",
  },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    console.log("Received event:", event); // Debug ke liye

    // verify incoming webhook
    await step.run("verify-webhook", async () => {
      const webhook = new Webhook(env.CLERK_WEBHOOK_SECRET);

      // Normalize and validate Svix headers from the incoming request
      const headers = event.data.headers as Record<
        string,
        string | string[] | undefined
      >;
      const idHeader = headers["svix-id"] ?? headers["Svix-Id"];
      const sigHeader = headers["svix-signature"] ?? headers["Svix-Signature"];
      const tsHeader = headers["svix-timestamp"] ?? headers["Svix-Timestamp"];

      const svixId = Array.isArray(idHeader) ? idHeader[0] : idHeader;
      const svixSignature = Array.isArray(sigHeader) ? sigHeader[0] : sigHeader;
      const svixTimestamp = Array.isArray(tsHeader) ? tsHeader[0] : tsHeader;

      if (!svixId || !svixSignature || !svixTimestamp) {
        throw new Error(
          "Missing required Svix headers for Clerk webhook verification."
        );
      }

      const svixHeaders: Record<string, string> = {
        "svix-id": svixId,
        "svix-signature": svixSignature,
        "svix-timestamp": svixTimestamp,
      };

      console.log("Svix Headers:", svixHeaders); // Debug ke liye

      try {
        webhook.verify(
          JSON.stringify(event.data.evt), // Original webhook payload
          svixHeaders
        );
        console.log("Webhook verified successfully!");
        return { verified: true };
      } catch (error) {
        console.error("Webhook verification failed:", error);
      }
    });

    // Create user in your database

    // return some response
    return {
      success: true,
      processed: true,
    };
  }
);
