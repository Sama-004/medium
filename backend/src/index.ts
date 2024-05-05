import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, jwt, sign, verify } from "hono/jwt";
import { Hono } from "hono";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    console.log(c.env.JWT_SECRET); // check env reaching backend
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt,
    });
  } catch (error) {
    return c.json({
      error: "error while signing up",
    });
  }
});

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    c.status(403);
    return c.json({
      error: "User not found",
    });
  }
  if (body.password === user.password) {
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt,
      message: "signed in",
    });
  } else {
    return c.json({
      message: "Incorrect email or password",
    });
  }
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
