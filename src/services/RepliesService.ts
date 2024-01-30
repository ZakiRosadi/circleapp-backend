import { Repository, Timestamp } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Reply } from "../entities/repliesEntity";
import { User } from "../entities/User";
import { Thread } from "../entities/threadsEntity";
import { threadId } from "worker_threads";
import cloudinary from "../middlewares/imageCloudinary";
import * as fs from "fs";
import moment from "moment";

export default new (class RepliesService {
  private readonly replyRepository: Repository<Reply> =
    AppDataSource.getRepository(Reply);

  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const responseData = await this.replyRepository.find({
        relations: ["user", "thread"],
      });
      return res
        .status(200)
        .json({ message: "Sucessfully get all data", data: responseData });
    } catch (error) {
      res.status(500).json({ message: "Cannot get data" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const id: number = Number(req.params.id);
      const userId = res.locals.loginsession.user.id;
      // let imageUrl = "";
      const threadId = await this.threadRepository.findOne({
        where: { id },
        relations: ["user"],
      });

      //code here

      const cloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "circle-app/reply",
      });

      const responseData = this.replyRepository.create({
        content: data.content,
        image: cloud.secure_url,
        userId: userId,
        threadId: threadId.id,

        // threadId: data.threadId,
        // threadId: threadId
      });

      await fs.unlinkSync(req.file.path);

      const saveData = await this.replyRepository.save(responseData);
      return res.status(200).json({
        message: "Sucessfully create data",
        data: saveData,
      });
    } catch (error) {
      console.log(error);

      return res.status(400).json({ message: "Cannot create data" });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const responseData = await this.replyRepository.findOne({
        where: { id },
        relations: ["user"],
      });
      if (responseData === null) {
        return res.status(404).json({ message: "Data not found" });
      }
      return res.status(200).json({ data: responseData });
    } catch (error) {
      return res.status(500).json({ message: "Cannot get data" });
    }
  }
})();
