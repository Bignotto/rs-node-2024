import Fastify from "fastify";

const fastify = Fastify();

fastify.get("/", () => {
  return `The app name is: ${process.env.THE_APP_NAME}`;
});

try {
  fastify.listen({ port: 3333 }).then(() => console.log("server running"));
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
