import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("/static/*", serveStatic({ root: "./" }));
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));
app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.get("*", serveStatic({ path: "./static/fallback.txt" }));

export default {
  port: 3000,
  fetch: app.fetch,
};
