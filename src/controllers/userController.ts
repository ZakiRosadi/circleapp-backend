import { Request, Response, response } from "express";
import userService from "../services/userService";

export default new (class UserController {
  findall(req: Request, res: Response) {
    userService.findAll(req, res);
  }
  create(req: Request, res: Response) {
    userService.create(req, res);
  }
})();
