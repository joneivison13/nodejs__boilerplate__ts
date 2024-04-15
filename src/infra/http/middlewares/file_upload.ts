import "dotenv/config";
import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(process.env.UPLOADS_PATH as string));
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split(".").pop();

    cb(null, `${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage });

export default upload;
