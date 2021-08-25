let fs = require("fs");
let path = require("path");
let types = {
  media: ["mp4", "mkv", "mp3"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
  pictures: ["png", "jpg", "jpeg"],
};
module.exports = organizeFiles = async (srcPath) => {
  try {
    let files = fs.readdirSync(srcPath);
    let organizeFolderPath = path.join(srcPath, "Organized Files"); // path to the folder that will be created

    if (!fs.existsSync(organizeFolderPath)) {
      fs.mkdirSync(organizeFolderPath);
    }

    for (let file of files) {
      let filePath = path.join(srcPath, file);
      if (fs.lstatSync(filePath).isFile()) {
        let fileType = checkType(file);
        let fileTypePath = path.join(organizeFolderPath, fileType);

        if (!fs.existsSync(fileTypePath)) {
          fs.mkdirSync(fileTypePath);
        }

        const sourcePath = path.join(srcPath, file);
        const destinationPath = path.join(fileTypePath, file);
        fs.copyFileSync(sourcePath, destinationPath);
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const checkType = (file) => {
  for (let type in types) {
    for (let ext of types[type]) {
      if (path.extname(file).split(".")[1].toLowerCase() == ext) {
        return type;
      }
    }
  }
  return "others";
};
