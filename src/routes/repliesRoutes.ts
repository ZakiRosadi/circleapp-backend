import * as express from "express";
import repliesController from "../controllers/repliesController";
import authMiddlewares from "../middlewares/authMiddlewares";
import upload from "../middlewares/MulterMiddlewares";

const repliesRouter = express.Router();
repliesRouter.get(
  "/reply",
  authMiddlewares.authentication,
  repliesController.findAll
);
repliesRouter.get(
  "/reply/:id",
  authMiddlewares.authentication,
  repliesController.findOne
);
repliesRouter.post(
  "/reply/:id",
  authMiddlewares.authentication,
  upload.single("image"),
  repliesController.create
);
export default repliesRouter;
