import { Request, Response } from "express";
import RepliesService from "../services/RepliesService";

export default new (class RepliesController {
  findAll(req: Request, res: Response) {
    RepliesService.findAll(req, res);
  }

  create(req: Request, res: Response) {
    RepliesService.create(req, res);
  }

  findOne(req: Request, res: Response) {
    RepliesService.findOne(req, res);
  }
})();
