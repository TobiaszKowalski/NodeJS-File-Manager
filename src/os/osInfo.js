import { os } from "../modules.js";

export default class OSInfoManager {
  static async getOperatingSystemInfo(args) {
    if (args.length !== 1) {
      console.log("Invalid command. Try again.");
      return;
    }

    const option = args[0];

    switch (option) {
      case "--EOL":
        await OSInfoManager.printEOL();
        break;
      case "--cpus":
        await OSInfoManager.printCPUs();
        break;
      case "--homedir":
        await OSInfoManager.printHomeDirectory();
        break;
      case "--username":
        await OSInfoManager.printCurrentUsername();
        break;
      case "--architecture":
        await OSInfoManager.printNodeArchitecture();
        break;
      default:
        console.log("Invalid option. Try again.");
        break;
    }
  }

  static async printEOL() {
    const eol = os.EOL;
    console.log(`End-Of-Line (EOL): ${eol}`);
  }

  static async printCPUs() {
    const cpus = os.cpus();
    console.log("CPUs:");
    cpus.forEach((cpu, index) => {
      console.log(`CPU ${index + 1}:`);
      console.log(`  Model: ${cpu.model}`);
      console.log(`  Clock rate: ${(cpu.speed / 1000).toFixed(2)} GHz`);
    });
  }

  static async printHomeDirectory() {
    const homedir = os.homedir();
    console.log(`Home Directory: ${homedir}`);
  }

  static async printCurrentUsername() {
    const username = os.userInfo().username;
    console.log(`Current System User: ${username}`);
  }

  static async printNodeArchitecture() {
    const architecture = process.arch;
    console.log(`Node.js Binary Architecture: ${architecture}`);
  }
}
