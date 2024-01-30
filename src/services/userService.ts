import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

export default new (class UserService {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const responseData = await this.userRepository.find();

      const dataUser = responseData.map((data) => {
        return {
          id: data.id,
          username: data.username,
          fullname: data.fullname,
        };
      });
      return res
        .status(200)
        .json({ message: "Sucessfully get all data", data: dataUser });
    } catch (error) {
      return res.status(500).json({ message: "Cannot get data" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const createUser = this.userRepository.create({
        username: data.username,
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        profile_picture: data.profile_picture,
        profile_description: data.profile_description,
      });

      const saveData = await this.userRepository.save(createUser);
      return res
        .status(200)
        .json({ message: "Sucessfully create data", data: saveData });
    } catch (error) {}
  }
})();
