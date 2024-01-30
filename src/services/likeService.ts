import { Repository } from "typeorm";
import { Like } from "../entities/likeEntity";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Thread } from "../entities/threadsEntity";

export default new (class LikeService {
  private readonly likeRepository: Repository<Like> =
    AppDataSource.getRepository(Like);

  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const responseData = await this.likeRepository.find({
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
      // const userId = req.body;

      // const threadId = await this.threadRepository.findOne({
      //   where: { id },
      //   relations: ["user"],
      // });

      const responseData: any = this.likeRepository.create({
        userId: userId,
        threadId: id,
      });

      const saveData = await this.likeRepository.save(responseData);
      return res
        .status(200)
        .json({ message: "Sucessfully create data", data: saveData });
    } catch (error) {
      res.status(500).json({ message: "Cannot create data" });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const responseData: any = await this.likeRepository.findOne({
        where: { id },
        relations: ["user", "thread"],
      });
      if (responseData === null) {
        return res.status(404).json({ message: "Data not found" });
      }
      return res.status(200).json({ data: responseData });
    } catch (error) {
      res.status(500).json({ message: "Cannot get data" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const responseData: any = await this.likeRepository.findOne({
        where: { id },
        relations: ["user", "thread"],
      });

      if (responseData === null) {
        return res.status(404).json({ message: "Data not found" });
      }

      const deleteData = await this.likeRepository.delete({
        id: responseData.id,
      });

      return res
        .status(200)
        .json({ message: "Sucessfully delete data", data: deleteData });
    } catch (error) {
      res.status(500).json({ message: "Cannot delete data", error });
    }
  }
})();
