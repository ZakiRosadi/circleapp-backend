import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "../upload"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// const uploadFile = (fieldname) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     return upload.single(fieldname)(req, res, (error) => {
//       if (error) {
//         return res.status(400).json({ message: error.message });
//       }
//       next();
//     });
//   };
// };
export default upload;
