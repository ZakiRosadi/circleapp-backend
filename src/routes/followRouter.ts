import * as express from "express";
import followController from "../controllers/followController";
import authMiddlewares from "../middlewares/authMiddlewares";

const followRouter = express.Router();
followRouter.get(
  "/follow",
  authMiddlewares.authentication,
  followController.findAll
);
followRouter.post(
  "/follow",
  authMiddlewares.authentication,
  followController.create
);
followRouter.delete(
  "/follow/:id",
  authMiddlewares.authentication,
  followController.delete
);
followRouter.get(
  "/followed",
  authMiddlewares.authentication,
  followController.getAllDataFollowed
);
followRouter.get(
  "/following",
  authMiddlewares.authentication,
  followController.getAllFollowing
);
export default followRouter;
