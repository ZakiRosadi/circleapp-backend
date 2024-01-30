import * as express from "express";
import threadController from "../controllers/threadController";
import authMiddlewares from "../middlewares/authMiddlewares";
import upload from "../middlewares/MulterMiddlewares";

const threadRouter = express.Router();
threadRouter.get(
  "/thread",
  authMiddlewares.authentication,
  threadController.findAll
);
threadRouter.get(
  "/thread/:id",
  authMiddlewares.authentication,
  threadController.findOne
);
threadRouter.post(
  "/thread",
  authMiddlewares.authentication,
  upload.single("image"),
  threadController.create
);

export default threadRouter;
