import { os, fs, path } from "../modules.js";

export default class FileOperationsManager {
  constructor() {
    this.currentDir = process.cwd();
  }

  async readFile(filePath) {
    try {
      const readableStream = fs.createReadStream(filePath, "utf8");
      readableStream.on("data", (chunk) => {
        console.log(chunk);
      });
      readableStream.on("error", (error) => {
        console.log("Operation failed");
      });
    } catch (error) {
      console.log("Operation failed");
    }
  }

  async createFile(fileName) {
    try {
      const filePath = path.join(process.cwd(), fileName);
      await fs.promises.writeFile(filePath, "");
      console.log("Operation failed");
    } catch (error) {
      console.log("Operation failed");
    }
  }

  async renameFile(filePath, newFileName) {
    try {
      const fullPath = path.resolve(os.homedir(), filePath);
      const fileDir = path.dirname(fullPath);
      const newFilePath = path.join(fileDir, newFileName);
      await fs.promises.rename(fullPath, newFilePath);
      console.log(`Renamed file to: ${newFilePath}`);
    } catch (error) {
      console.log("Operation failed");
    }
  }

  async copyFile(sourcePath, destinationDir) {
    try {
      const sourceFullPath = path.resolve(os.homedir(), sourcePath);
      const destinationFullPath = path.resolve(os.homedir(), destinationDir, path.basename(sourceFullPath));
      const sourceStream = fs.createReadStream(sourceFullPath);
      const destinationStream = fs.createWriteStream(destinationFullPath);

      sourceStream.on("error", (error) => {
        console.log(`Error reading source file: ${error.message}`);
      });

      destinationStream.on("error", (error) => {
        console.log(`Error writing to destination file: ${error.message}`);
      });

      sourceStream.pipe(destinationStream);
      sourceStream.on("end", () => {
        console.log(`Copied file to: ${destinationFullPath}`);
      });
    } catch (error) {
      console.log("Operation failed");
    }
  }

  async moveFile(sourcePath, destinationDir) {
    try {
      const sourceFullPath = path.resolve(os.homedir(), sourcePath);
      const destinationFullPath = path.resolve(os.homedir(), destinationDir, path.basename(sourceFullPath));
      const sourceStream = fs.createReadStream(sourceFullPath);
      const destinationStream = fs.createWriteStream(destinationFullPath);

      sourceStream.on("error", (error) => {
        console.log(`Error reading source file: ${error.message}`);
      });

      destinationStream.on("error", (error) => {
        console.log(`Error writing to destination file: ${error.message}`);
      });

      sourceStream.pipe(destinationStream);
      sourceStream.on("end", async () => {
        await fs.promises.unlink(sourceFullPath);
        console.log(`Moved file to: ${destinationFullPath}`);
      });
    } catch (error) {
      console.log("Operation failed");
    }
  }

  async deleteFile(filePath) {
    try {
      await fs.promises.unlink(filePath);
      console.log(`Deleted file: ${filePath}`);
    } catch (error) {
      console.log("Operation failed");
    }
  }
}
