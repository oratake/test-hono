import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("/static/*", serveStatic({ root: "./" }));
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));
app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.get("/posts/:id", (c) => {
  const page = c.req.query("page");
  const id = c.req.param("id");
  c.header("X-Message", "Hi!");
  return c.text(`You want see ${page} of ${id}`);
});

// API
app.get("/api/hello", (c) => {
  return c.json({
    ok: true,
    message: "Hello Hono!",
  });
});

// fallback
app.get("*", serveStatic({ path: "./static/fallback.txt" }));

export default {
  port: 3000,
  fetch: app.fetch,
};
