const multer = require("multer");
require("dotenv").config({ path: "src/config/.env" });
const { unlinkSync } = require("fs");

// upload file path
const FILE_PATH = process.env.FILE_PATH || "public";

const removeFile = (file) => {
  try {
    const deleteFile = `${FILE_PATH}/${file}`;
    unlinkSync(deleteFile, (err) => {
      throw new Error(err);
    });
    return removeFile;
  } catch (err) {
    return err;
  }
};

// configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${FILE_PATH}/`);
  },
  filename: (req, file, cb) => {
    var filename = file.originalname;
    cb(null, Date.now() + "_" + filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    try {
      let error = "Error: Allowed only .JPEG, .JPG, .PNG";
      const { mimetype, originalname } = file;
      if (
        mimetype == "image/jpeg" ||
        mimetype === "image/png" ||
        mimetype == "image/jpg"
      ) {
        cb(null, true);
      } else {
        cb(error, false);
      }
    } catch (error) {
      return cb(null, false);
    }
  },
});

module.exports = {
  upload,
  storage,
  removeFile,
};
