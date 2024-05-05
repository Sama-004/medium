import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient();
  ({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });
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
