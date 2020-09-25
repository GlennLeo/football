import express, { Express } from "express";
import nextApp from "@monorepo/client";
import apolloServer from "@monorepo/graphql";

const { PORT } = process.env;

async function main() {
  const app = express();

  await bootstrapApolloServer(app);
  await bootstrapClientApp(app);

  app.listen(PORT, () => {
    console.log(`[ server ] ready on port ${PORT}`);
  });
}

async function bootstrapClientApp(expressApp: Express) {
  await nextApp.prepare();
  const handler = nextApp.getRequestHandler();
  expressApp.get("*", (req, res) => handler(req, res));
}

async function bootstrapApolloServer(expressApp: Express) {
  apolloServer.applyMiddleware({ app: expressApp });
}

main();
