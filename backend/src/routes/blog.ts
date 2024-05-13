import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, jwt, sign, verify } from "hono/jwt";
import { Context, Hono } from "hono";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      console.log("logged in");
      await next();
    } else {
      c.status(404);
      return c.json({
        error: "Not logged in",
      });
    }
  } catch (err) {
    c.status(403);
    return c.json({
      error: "Not logged in",
    });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");
  if (!body.title || !body.content) {
    c.status(400);
    return c.json({
      error: "Title and content cannot be empty",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        publishDate: body.publishDate,
        authorId: userId,
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (err) {
    c.status(403);
    return c.json({
      error: "Error creating post ${err}",
    });
  }
});

blogRouter.put("/edit/:id", async (c) => {
  const postId = c.req.param("id");
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: body.title,
        content: body.content,
        publishDate: body.publishDate,
      },
    });
    return c.json({
      message: "Blog updated",
      blog,
    });
  } catch (err) {
    return c.json({
      error: "Error updating blog",
    });
  }
});

//add paginaiton
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        publishDate: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ blogs });
  } catch (err) {
    return c.json({
      error: "Error getting blogs",
    });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        publishDate: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({
      blog,
    });
  } catch (err) {
    c.status(401);
    return c.json({
      error: "error fetching the blog",
    });
  }
});

blogRouter.delete("/delete/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  const blogId = c.req.param("id");
  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: blogId,
      },
      select: {
        authorId: true,
      },
    });
    if (!blog) {
      return c.json({
        error: "Blog not found",
      });
    }
    if (blog.authorId !== userId) {
      c.status(403);
      return c.json({
        error: "You are not the author of this blog",
      });
    }
    await prisma.post.delete({
      where: {
        id: blogId,
      },
    });
    return c.json({
      message: "Blog deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return c.json({
      error: "Error while deleting blog",
    });
  }
});
