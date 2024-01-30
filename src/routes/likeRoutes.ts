import * as express from "express";
import likeController from "../controllers/likeController";
import authMiddlewares from "../middlewares/authMiddlewares";

const likeRouter = express.Router();
likeRouter.get("/like", authMiddlewares.authentication, likeController.findAll);
likeRouter.post(
  "/like/:id",
  authMiddlewares.authentication,
  likeController.create
);
likeRouter.get(
  "/like/:id",
  authMiddlewares.authentication,
  likeController.findOne
);

likeRouter.delete(
  "/like/:id",
  authMiddlewares.authentication,
  likeController.delete
);

export default likeRouter;
