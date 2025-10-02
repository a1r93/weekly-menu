import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    defaultPreloadStaleTime: 0,
    routeTree,
    scrollRestoration: true,
  });
}
