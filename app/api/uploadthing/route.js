import { createNextRouteHandler } from "uploadthing/server";
import { audioFileRouter } from "./core";

export const { GET, POST } = createNextRouteHandler({
  router: audioFileRouter,
});
