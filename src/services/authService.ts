import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { AuthUtilsLogin, AuthUtilsRegister } from "../utilities/authUtils";
import cloudinary from "../middlewares/imageCloudinary";
import * as fs from "fs";

export default new (class AuthService {
  private readonly authRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async Register(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { error } = AuthUtilsRegister.validate(data);
      if (error) return res.status(400).json(error.message);

      const responseData: number = await this.authRepository.count({
        where: { email: data.email },
      });

      if (responseData > 0) {
        return res.status(401).json({ message: "Email already exists" });
      }

      const bcryptpassword = await bcrypt.hash(data.password, 10);
      const createData = this.authRepository.create({
        username: data.username,
        fullname: data.fullname,
        email: data.email,
        password: bcryptpassword,
        profile_picture: data.profile_picture,
        profile_description: data.profile_description,
      });

      const saveData = await this.authRepository.save(createData);
      return res
        .status(200)
        .json({ message: "Sucessfully create data", data: saveData });
    } catch (error) {
      return res.status(500).json({ message: "cannot create data" });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { error } = AuthUtilsLogin.validate(data);
      if (error) return res.status(400).json(error.message);
      //find email
      const responseData: any = await this.authRepository.findOne({
        where: { email: data.email },
      });

      //check email
      if (responseData === null) {
        return res.status(401).json({ message: "Email is not found" });
      }

      //check password
      const checkPassword = await bcrypt.compare(
        data.password,
        responseData.password
      );

      if (checkPassword === false) {
        return res.status(401).json({ message: "Password is wrong" });
      }

      //login
      const user = await this.authRepository.create({
        id: responseData.id,
        email: responseData.email,
      });

      const getToken = jwt.sign({ user }, "SECRET TOKEN", { expiresIn: "1h" });
      return res
        .status(200)
        .json({ message: "Sucessfully login", token: getToken });
    } catch (error) {}
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      // const id: number = Number(req.params.id);

      const userId = res.locals.loginsession.user.id;
      const dataFindone = await this.authRepository.findOne({
        where: { id: userId },
        relations: ["follows", "followed"],
      });
      if (dataFindone === null) {
        return res.status(404).json({ message: "Data not found" });
      }

      const requiredData = {
        id: dataFindone.id,
        username: dataFindone.username,
        email: dataFindone.email,
        fullname: dataFindone.fullname,
        profile_picture: dataFindone.profile_picture,
        profile_description: dataFindone.profile_description,
        follows: dataFindone.follows.length,
        followed: dataFindone.followed.length,
      };
      return res.status(200).json({ data: requiredData });
    } catch (error) {
      return res.status(500).json({ message: "Cannot get data" });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const responseData = await this.authRepository.find({
        relations: ["follows", "followed"],
      });

      const resData = responseData.map((data) => {
        return {
          id: data.id,
          username: data.username,
          email: data.email,
          fullname: data.fullname,
          profile_picture: data.profile_picture,
          profile_description: data.profile_description,
          follows: data.follows,
          followed: data.followed,
        };
      });
      return res
        .status(200)
        .json({ message: "Sucessfully get all data", data: resData });
    } catch (error) {
      return res.status(500).json({ message: "Cannot get data" });
    }
  }

  async findOneFollowed(req: Request, res: Response): Promise<Response> {
    try {
      const userId = res.locals.loginsession.user.id;

      const dataFind = await this.authRepository.find({
        relations: ["followed"],
      });

      const data = dataFind.map((data) => {
        return {
          id: data.id,
          username: data.username,
          fullname: data.fullname,
          profile_picture: data.profile_picture,
          followed: data.followed,
        };
      });

      const dataFiltered = data.filter((data) => data.id != userId);

      const dataFiltered2 = dataFiltered.filter((data) => {
        const followed = data.followed.map((item: any) => item.userId);
        if (followed.includes(userId) === false) {
          return data;
        }
      });

      return res.status(200).json({ data: dataFiltered2 });
    } catch (error) {
      return res.status(500).json({ message: "Cannot get data", error });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      // const { data } = req.body.;
      const { fullname, username, profile_description } = req.body;
      console.log(fullname, username, profile_description);

      const userId = res.locals.loginsession.user.id;
      const dataUser = await this.authRepository.findOneBy({ id: userId });

      if (dataUser === null) {
        return res.status(404).json({ message: "Data not found" });
      }

      const image = req.file;
      console.log(image);

      // const uploadCloud = await cloudinary.uploader.upload(image.path, {
      //   folder: "circle-app/profile",
      // });
      // dataUser.profile_picture = uploadCloud.secure_url;
      // console.log("url pertamaaaaaa", dataUser.profile_picture);

      // if (image !== undefined) {
      //   const urlArray = dataUser.profile_picture.split("/");
      //   const imageName = urlArray[urlArray.length - 1];
      //   const publicId = imageName.split(".")[0];
      //   await cloudinary.uploader.destroy(publicId);
      // }

      const newCloud = await cloudinary.uploader.upload(image.path, {
        folder: "circle-app/profile",
      });

      fs.unlinkSync(image.path);

      dataUser.fullname = fullname;
      dataUser.username = username;
      dataUser.profile_description = profile_description;
      dataUser.profile_picture = newCloud.secure_url;

      const updateData = await this.authRepository.save(dataUser);
      console.log("update data>>>>>>>>>>>>>>>>>>>>>>>>>>", updateData);

      return res
        .status(200)
        .json({ message: "Sucessfully update data", data: updateData });
    } catch (error) {
      return res.status(500).json({ message: "Cannot get data", error });
    }
  }
})();
