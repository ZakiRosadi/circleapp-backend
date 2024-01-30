import { Request, Response } from "express";
import likeService from "../services/likeService";

export default new (class LikeController {
  findAll(req: Request, res: Response) {
    likeService.findAll(req, res);
  }

  create(req: Request, res: Response) {
    likeService.create(req, res);
  }

  findOne(req: Request, res: Response) {
    likeService.findOne(req, res);
  }

  delete(req: Request, res: Response) {
    likeService.delete(req, res);
  }
})();
