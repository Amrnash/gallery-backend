const multer = require("multer");
const path = require("path");
function configureMulter(destFolder) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, `../uploads/${destFolder}/`));
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({
    storage,
    fileFilter(req, file, cb) {
      if (path.extname(file.originalname) !== "jpg" || "png") {
        cb(null, false);
      }
      cb(null, true);
    },
    limits: { fieldSize: 15 * 1024 * 1024 },
  });
  return upload;
}
module.exports = configureMulter;
