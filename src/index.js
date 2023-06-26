import { readline, os, NavigationManager, FileOperationsManager, HashManager, OSInfoManager } from "./modules.js";

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
      case "test":
        console.log("Test");
        break;
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
        fileOperationManager.readFile(params[0]);
        break;
      case "add":
        // create empty file logic
        //add file in current directory
        fileOperationManager.createFile(params[0]);
        break;
      case "rn":
        // Rename file logic
        // Path's starts from home directory which is os.homedir()
        fileOperationManager.renameFile(params[0], params[1]);
        break;
      case "cp":
        // Copy file logic
        // Path's starts from home directory which is os.homedir()
        fileOperationManager.copyFile(params[0], params[1]);
        break;
      case "mv":
        // Move file logic
        // Path's starts from home directory which is os.homedir()
        fileOperationManager.moveFile(params[0], params[1]);
        break;
      case "rm":
        // Remove file logic
        // Path starts from current directory you are
        fileOperationManager.deleteFile(params[0]);
        break;
      case "hash":
        // Path starts from current directory you are
        // In this case instance of class wasn't created because there is no dependency from outer data
        HashManager.calculateHash(params[0]);
        break;
      case "os":
        // In this case instance of class wasn't created because there is no dependency from outer data
        OSInfoManager.getOperatingSystemInfo(params);
        break;
      case "fail":
        // error test
        throw new Error();
      case ".exit":
        consoleInterface.close();
        break;
      default:
        console.log("Invalid command. Try again.");
        break;
    }
  } catch (error) {
    console.log(
      "Operation failed. Check if the file or path exists and try again."
    );
  }
  console.log(`You are currently in ${process.cwd()}`);
  consoleInterface.prompt();
});

consoleInterface.on("close", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
});
