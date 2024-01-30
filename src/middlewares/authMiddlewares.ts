import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export default new (class AuthMiddlewares {
  authentication(req: Request, res: Response, next: NextFunction): Response {
    try {
      const authorization = req.headers.authorization;
      // const authorization = req.header("authorization");

      if (!authorization || !authorization.startsWith("Bearer")) {
        return res.status(401).json({ message: "required token" });
      }

      const tokenSplit = authorization.split(" ");

      try {
        const loginsession = jwt.verify(tokenSplit[1], "SECRET TOKEN");
        res.locals.loginsession = loginsession;
        next();
      } catch (error) {
        return res.status(401).json({ message: "invalid token" });
      }
    } catch (error) {
      return res.status(500).json({ message: "internal server error" + error });
    }
  }
})();
