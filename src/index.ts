import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import express from "express";
import { Request, Response } from "express";
import threadRouter from "./routes/threadRoutes";
// import userRouter from "./routes/userRoutes";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import repliesRouter from "./routes/repliesRoutes";
import likeRouter from "./routes/likeRoutes";
import followRouter from "./routes/followRouter";
AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const PORT = 5000;

    const corsOption = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };

    app.use(express.json());
    app.use(cors(corsOption));
    app.use("/api/v1", threadRouter);
    app.use("/api/v1", authRouter);
    // app.use("/api/v1", userRouter);
    app.use("/api/v1", repliesRouter);
    app.use("/api/v1", likeRouter);
    app.use("/api/v1", followRouter);

    app.get("/hello", (req: Request, res: Response) => {
      return res.status(200).json({ message: "Hello World!" });
    });

    app.listen(PORT, () => {
      console.log("server is running on port " + PORT);
    });
  })
  .catch((error) => console.log(error));
