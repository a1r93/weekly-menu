import { getRouteApi } from "@tanstack/react-router";

export function useAuth() {
  const routeApi = getRouteApi("/_app");
  const { session } = routeApi.useLoaderData();
  return session;
}
