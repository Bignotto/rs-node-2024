import cookie from "@fastify/cookie";
import Fastify from "fastify";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";

const fastify = Fastify();
fastify.register(cookie);

fastify.get("/", () => {
  return `The app name is: ${env.THE_APP_NAME}`;
});

fastify.register(transactionsRoutes, {
  prefix: "transactions",
});

try {
  fastify
    .listen({ port: 3333 })
    .then(() => console.log(`The app name is: ${env.THE_APP_NAME}`));
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
