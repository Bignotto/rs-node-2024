import { env } from "./env";
import Fastify from "fastify";

const fastify = Fastify();

fastify.get("/", () => {
  return `The app name is: ${env.THE_APP_NAME}`;
});

try {
  fastify
    .listen({ port: 3333 })
    .then(() => console.log(`The app name is: ${env.THE_APP_NAME}`));
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
