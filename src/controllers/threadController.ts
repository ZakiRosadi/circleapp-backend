import { Response, Request } from "express";
import threadService from "../services/threadService";

export default new (class ThreadController {
  findAll(req: Request, res: Response) {
    threadService.findAll(req, res);
  }

  create(req: Request, res: Response) {
    threadService.create(req, res);
  }

  findOne(req: Request, res: Response) {
    threadService.findOne(req, res);
  }
})();
