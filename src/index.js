import { 
  readline, os, NavigationManager, FileOperationsManager, HashManager, OSInfoManager, ArchiveManager 
} from "./modules.js";

const consoleInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

process.chdir(os.homedir());

const args = process.argv.slice(2);
const username = args
  .find((arg) => arg.startsWith("--username="))
  .split("=")[1];

const navigation = new NavigationManager();
const fileOperationManager = new FileOperationsManager();

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${process.cwd()}`);

consoleInterface.prompt();
consoleInterface.on("line", async (input) => {
  const [command, ...params] = input.trim().split(" ");

  try {
    switch (command) {
      case "up":
        await navigation.goUp();
        break;
      case "ls":
        await navigation.listDirectoryContent();
        break;
      case "cd":
        await navigation.changeDirectory(params[0]);
        break;
      case "cat":
        // read file and print content logic
        // Path starts from current directory you are
        await fileOperationManager.readFile(params[0]);
        break;
      case "add":
        // create empty file logic
        //add file in current directory
        await fileOperationManager.createFile(params[0]);
        break;
      case "rn":
        // Rename file logic
        // Path's starts from home directory which is os.homedir()
        await fileOperationManager.renameFile(params[0], params[1]);
        break;
      case "cp":
        // Copy file logic
        // Path's starts from home directory which is os.homedir()
        await fileOperationManager.copyFile(params[0], params[1]);
        break;
      case "mv":
        // Move file logic
        // Path's starts from home directory which is os.homedir()
        await fileOperationManager.moveFile(params[0], params[1]);
        break;
      case "rm":
        // Remove file logic
        // Path starts from current directory you are
        await fileOperationManager.deleteFile(params[0]);
        break;
      case "hash":
        // Path starts from current directory you are
        // In this case instance of class wasn't created because there is no dependency from outer data
        await HashManager.calculateHash(params[0]);
        break;
      case "os":
        // In this case instance of class wasn't created because there is no dependency from outer data
        await OSInfoManager.getOperatingSystemInfo(params);
        break;
      case "compress":
        // In this case instance of class wasn't created because there is no dependency from outer data
        await ArchiveManager.compressFile(params[0], params[1]);
        break;
      case "decompress":
        // In this case instance of class wasn't created because there is no dependency from outer data
        await ArchiveManager.decompressFile(params[0], params[1]);
        break;
      case ".exit":
        consoleInterface.close();
        break;
      default:
        console.log("Invalid input");
        break;
    }
  } catch (error) {
    console.log( "Operation failed");
  }
  console.log(`You are currently in ${process.cwd()}`);
  consoleInterface.prompt();
});

consoleInterface.on("close", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
});
