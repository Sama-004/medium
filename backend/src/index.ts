import { Hono } from "hono";

const app = new Hono();

app.post("/api/v1/signup", (c) => {
  return c.text("signup route");
});

app.post("/api/v1/signin", (c) => {
  return c.text("singin route");
});

app.post("/api/v1/blog", (c) => {
  return c.text("post blog");
});

app.put("/api/v1/blog", (c) => {
  return c.text("edit blog");
});

app.get("/api/v1/blog:id", (c) => {
  return c.text("get blog route");
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("blog bulk");
});

export default app;
