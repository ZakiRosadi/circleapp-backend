import { Repository } from "typeorm";
import { Thread } from "../entities/threadsEntity";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { ThreadUtil } from "../utilities/allUtils";
import cloudinary from "../middlewares/imageCloudinary";
import * as fs from "fs";

export default new (class threadService {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const responseData = await this.threadRepository.find({
        relations: ["user", "reply", "like"],
        order: { postedAt: "DESC" },
      });
      // console.log("response data", responseData);

      // // const dataUser = responseData.map((data) => {
      // //   return {
      // //     id: data.id,
      // //     content: data.content,
      // //     image: data.image,
      // //     postedAt: data.postedAt,
      // //     if (Array.isArray(data.User)) {
      // //       User: data.User.map((user) => {

      // //     }

      // //     })
      //   };
      // });

      return res
        .status(200)
        .json({ message: "Sucessfully get all data", data: responseData });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Cannot get data" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = {
        content: req.body.content,
        image: "",
      };

      const userId = res.locals.loginsession.user.id;

      if (req.file) {
        const cloud = await cloudinary.uploader.upload(req.file.path, {
          folder: "circle-app/thread",
        });
        data.image = cloud.secure_url;
        await fs.unlinkSync(req.file.path);
      }

      const createDataThread = this.threadRepository.create({
        ...data,
        // image: data.image,
        user: userId,
      });

      const saveData = await this.threadRepository.save(createDataThread);
      return res
        .status(200)
        .json({ message: "Sucessfully create data", data: saveData });
    } catch (error) {
      return res.status(500).json({ message: "Cannot get data", error });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);

      const dataFindone = await this.threadRepository.findOne({
        where: { id },
        relations: ["user", "reply", "like"],
      });
      if (dataFindone === null) {
        return res.status(404).json({ message: "Data not found" });
      }
      return res.status(200).json({ data: dataFindone });
    } catch (error) {
      return res.status(500).json({ message: "Cannot get data" });
    }
  }
})();
