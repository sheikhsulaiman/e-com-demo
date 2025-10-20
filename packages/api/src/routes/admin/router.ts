import { Hono } from "hono";
import { categoryRouter } from "./categories";
import { orderRouter } from "./orders";
import { organizationRouter } from "./organizations";
import { productRouter } from "./products";
import { userRouter } from "./users";

export const adminRouter = new Hono()
	.basePath("/admin")
	.route("/", organizationRouter)
	.route("/", userRouter)
	.route("/", productRouter)
	.route("/", categoryRouter)
	.route("/", orderRouter);
