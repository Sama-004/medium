import { verify } from "hono/jwt";
import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route("/api/v1/auth", userRouter);
app.route("/api/v1/blog", blogRouter);

// app.use("/api/v1/blog/*", async (c, next) => {
//   const header = c.req.header("Authorization");
//   if (header) {
//     const token = header.split("")[1];
//     const response = await verify(token, c.env.JWT_SECRET);
//     if (response.id) {
//       await next();
//     } else {
//       c.status(403);
//       return c.json({
//         message: "Unauthorized",
//       });
//     }
//   }
// });

export default app;
