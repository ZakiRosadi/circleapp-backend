import { Request, Response } from "express";
import authService from "../services/authService";

export default new (class authController {
  Register(req: Request, res: Response) {
    authService.Register(req, res);
  }
  login(req: Request, res: Response) {
    authService.login(req, res);
  }
  findOne(req: Request, res: Response) {
    authService.findOne(req, res);
  }
  findAll(req: Request, res: Response) {
    authService.findAll(req, res);
  }

  findOneFollowed(req: Request, res: Response) {
    authService.findOneFollowed(req, res);
  }

  update(req: Request, res: Response) {
    authService.update(req, res);
  }
})();
