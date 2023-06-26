import { fs, zlib, path } from "../modules.js";

export default class ArchiveManager {
  static compressFile(filePath, destinationPath) {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(filePath);

      let writeStream;
      // both cases covered: with provided name and without
      if (path.extname(destinationPath) === "") {
        const fileName = path.basename(filePath);
        const compressedFileName = fileName + ".br";
        const compressedFilePath = path.join(
          destinationPath,
          compressedFileName
        );
        writeStream = fs.createWriteStream(compressedFilePath);
      } else {
        writeStream = fs.createWriteStream(destinationPath);
      }

      const compressStream = zlib.createBrotliCompress();

      readStream
        .pipe(compressStream)
        .pipe(writeStream)
        .on("finish", () => {
          resolve();
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }

  static decompressFile(filePath, destinationPath) {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(filePath);

      let writeStream;
      // both cases covered: with provided name and without
      if (path.extname(destinationPath) === "") {
        const fileName = path.basename(filePath, ".br");
        const decompressedFilePath = path.join(destinationPath, fileName);
        writeStream = fs.createWriteStream(decompressedFilePath);
      } else {
        writeStream = fs.createWriteStream(destinationPath);
      }

      const decompressStream = zlib.createBrotliDecompress();

      readStream
        .pipe(decompressStream)
        .pipe(writeStream)
        .on("finish", () => {
          resolve();
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
}
