import { Request, Response } from "express";
import followService from "../services/followService";

export default new (class FollowContoller {
  findAll(req: Request, res: Response) {
    followService.findAll(req, res);
  }

  create(req: Request, res: Response) {
    followService.create(req, res);
  }

  delete(req: Request, res: Response) {
    followService.delete(req, res);
  }

  getAllDataFollowed(req: Request, res: Response) {
    followService.getAllDataFollowed(req, res);
  }

  getAllFollowing(req: Request, res: Response) {
    followService.getAllFollowing(req, res);
  }
})();
