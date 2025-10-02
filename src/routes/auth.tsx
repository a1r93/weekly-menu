import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSessionServerFn } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  loader: async () => {
    const session = await getSessionServerFn();
    if (session?.session) {
      throw redirect({ to: "/" });
    }
  },
});
