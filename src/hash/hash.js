import { fs, crypto } from "../modules.js";

export default class HashManager {
  static async calculateHash(filePath) {
    try {
      const fileStream = fs.createReadStream(filePath);
      const hash = crypto.createHash("sha256");

      fileStream.on("data", (chunk) => {
        hash.update(chunk);
      });

      fileStream.on("end", () => {
        const fileHash = hash.digest("hex");
        console.log(`Hash of ${filePath}: ${fileHash}`);
      });

      fileStream.on("error", (error) => {
        console.log(`Error reading file: ${error.message}`);
      });
    } catch (error) {
      console.log("Failed to calculate hash.");
    }
  }
}
