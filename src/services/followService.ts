import { Repository } from "typeorm";
import { Follows } from "../entities/followsEntity";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

export default new (class FollowService {
  private readonly followRepository: Repository<Follows> =
    AppDataSource.getRepository(Follows);

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const responseData = await this.followRepository.find({
        relations: ["user", "followed"],
      });

      return res
        .status(200)
        .json({ message: "Sucessfully get all data", data: responseData });
    } catch (error) {
      res.status(500).json({ message: "Cannot get data", error });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { followedId } = req.body;
      const userId = res.locals.loginsession.user.id;

      const responseData = this.followRepository.create({
        userId: userId,
        followedId: followedId,
      });

      const saveData = await this.followRepository.save(responseData);

      return res.status(200).json({
        message: "Sucessfully create data",
        data: saveData,
      });
    } catch (error) {
      res.status(500).json({ message: "Cannot get data", error });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const responseData = await this.followRepository.findOne({
        where: { id },
        relations: ["user", "followed"],
      });

      if (responseData === null) {
        return res.status(404).json({ message: "Data not found" });
      }

      const deleteData = await this.followRepository.delete({
        id: responseData.id,
      });

      return res
        .status(200)
        .json({ message: "Sucessfully delete data", data: deleteData });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllDataFollowed(req: Request, res: Response): Promise<Response> {
    try {
      const userId = res.locals.loginsession.user.id;
      const responseData = await this.followRepository.find({
        where: { followedId: userId },
        relations: ["user", "followed"],
      });

      if (responseData === null) {
        return res.status(404).json({ message: "Data not found" });
      }

      const newData = await Promise.all(
        responseData.map(async (data) => {
          let isFollowing = false;
          const checkData = await this.followRepository.count({
            where: {
              userId: userId,
              followedId: data.userId,
            },
            relations: ["followed"],
          });

          if (checkData > 0) {
            isFollowing = true;
          }
          return {
            id: data.id,
            userId: data.userId,
            followedId: data.followedId,
            user: data.user,
            isFollowing: isFollowing,
          };
        })
      );

      return res
        .status(200)
        .json({ message: "Sucessfully get all data", data: newData });
    } catch (error) {
      res.status(500).json({ message: "Cannot get data", error });
    }
  }

  async getAllFollowing(req: Request, res: Response): Promise<Response> {
    try {
      const userId = res.locals.loginsession.user.id;
      const responseData = await this.followRepository.find({
        where: { userId: userId },
        relations: ["user", "followed"],
      });

      const newData = responseData.map((data) => {
        return {};
      });

      if (responseData === null) {
        return res.status(404).json({ message: "Data not found" });
      }

      const mapData = responseData.map((res) => {
        return {
          id: res.id,
          userId: res.userId,
          followedId: res.followedId,
          followed: res.followed,
        };
      });

      return res
        .status(200)
        .json({ message: "Sucessfully get all data", data: mapData });
    } catch (error) {
      res.status(500).json({ message: "Cannot get data", error });
    }
  }
})();
