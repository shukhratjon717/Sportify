import path from "path";
import multer from "multer";
import { v4 } from "uuid";

/** MULTER IMAGE UPLOADER */
function getTargetImageStorage(address: any) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${address}`);
    },
    filename: function (req, file, cb) {
      const extention = path.parse(file.originalname).ext;
      const randomName = v4() + extention;
      cb(null, randomName);
    },
  });
}

const makeUploader = (address: string) => {
  const storage = getTargetImageStorage(address);
  return multer({ storage: storage });
};

export default makeUploader;
