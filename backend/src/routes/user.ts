import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, jwt, sign, verify } from "hono/jwt";
import bcrypt from "bcryptjs";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (existingUser) {
    return c.json({
      error: "A user with this email already exists",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt,
      username: user.name,
    });
  } catch (error) {
    return c.json({
      error: "error while signing up",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  if (body) {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      c.status(403);
      return c.json({
        error: "Incorrect email or password",
      });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt,
      username: user.name,
    });
  } else {
    return c.json({
      error: "Internal server error",
    });
  }
});

userRouter.delete("/delete", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authHeader = c.req.header("Authorization") || "";
  try {
    const payload = await verify(authHeader, c.env.JWT_SECRET);
    console.log("payload:", payload);
    const userId = payload && payload.id;
    console.log(userId);
    if (!userId) {
      c.status(401);
      return c.json({
        error: "Not logged in",
      });
    }
    const foundUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!foundUser) {
      return c.json({
        error: "User not found",
      });
    }
    await prisma.post.deleteMany({
      where: {
        authorId: userId,
      },
    });
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return c.json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return c.json({
      error: "Error while deleting user",
    });
  }
});

userRouter.get("/profile", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authHeader = c.req.header("Authorization") || "";
  if (!authHeader) {
    return c.json({
      error: "Token is required",
    });
  }
  let userId;
  try {
    const decoded = await verify(authHeader, c.env.JWT_SECRET);
    userId = decoded.id;
  } catch (error) {
    return c.json({
      error: "Invalid token",
    });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        posts: {
          where: {
            Published: false,
          },
          select: {
            id: true,
            title: true,
            content: true,
            publishDate: true,
            author: {
              select: {
                name: true, // Include author's name
              },
            },
          },
        },
      },
    });
    return c.json({
      posts: user?.posts,
    });
  } catch (err) {
    return c.json({
      error: "Error while fetching posts",
    });
  }
});
