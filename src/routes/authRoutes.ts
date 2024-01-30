import * as express from "express";
import authController from "../controllers/authController";
import authMiddlewares from "../middlewares/authMiddlewares";
import upload from "../middlewares/MulterMiddlewares";

const authRouter = express.Router();
// authRouter.get("/user", authController.Register);
authRouter.post("/register", authController.Register);
authRouter.post("/login", authController.login);
authRouter.get("/user", authMiddlewares.authentication, authController.findOne);
authRouter.get(
  "/userall",
  authMiddlewares.authentication,
  authController.findAll
);
authRouter.get(
  "/userfollowed",
  authMiddlewares.authentication,
  authController.findOneFollowed
);
authRouter.patch(
  "/userupdate",
  authMiddlewares.authentication,
  upload.single("profile_picture"),
  authController.update
);

export default authRouter;
