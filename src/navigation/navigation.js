import { os, fs, path } from "../modules.js";

export default class NavigationManager {
  constructor() {
    this.currentDir = process.cwd();
    this.rootDir = os.homedir();
  }

  async goUp() {
    const parentDir = path.dirname(this.currentDir);
    if (parentDir.length < this.currentDir.length && this.currentDir !== this.rootDir) {
      process.chdir(parentDir);
      this.currentDir = parentDir;
      console.log(`Moved up to ${this.currentDir}`);
    } else {
      console.log("You cannot go beyond the root directory");
      console.log("Operation failed");
    }
  }

  async changeDirectory(directoryPath) {
    const newPath = path.resolve(this.currentDir, directoryPath);
    if (newPath.length >= this.rootDir.length) {
      try {
        const stats = await fs.promises.stat(newPath);
        if (stats.isDirectory()) {
          await process.chdir(newPath);
          this.currentDir = newPath;
          console.log(`Changed to ${this.currentDir}`);
        } else {
          console.log("Operation failed");
        }
      } catch (error) {
        console.log("Invalid input");
      }
    } else {
      console.log("Cannot go beyond the root directory")
      console.log("Operation failed");
    }
  }

  async listDirectoryContent() {
    try {
      const items = await fs.promises.readdir(this.currentDir);
      const statsPromises = items.map(item =>
        fs.promises.stat(path.join(this.currentDir, item))
          .then(stats => ({Name: item, Type: stats.isDirectory() ? "Folder" : "File"}))
      );
      const results = await Promise.all(statsPromises);
      const sortedItems = results.sort((a, b) => {
        if (a.Type === b.Type) {
          return a.Name.localeCompare(b.Name);
        } else {
          return a.Type === "Folder" ? -1 : 1;
        }
      });
      console.table(sortedItems);
    } catch (error) {
      console.log("Operation failed");
    }
  }
}
