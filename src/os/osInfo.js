import { os } from "../modules.js";

export default class OSInfoManager {
  static getOperatingSystemInfo(args) {
    if (args.length !== 1) {
      console.log("Invalid command. Try again.");
      return;
    }

    const option = args[0];

    switch (option) {
      case "--EOL":
        OSInfoManager.printEOL();
        break;
      case "--cpus":
        OSInfoManager.printCPUs();
        break;
      case "--homedir":
        OSInfoManager.printHomeDirectory();
        break;
      case "--username":
        OSInfoManager.printCurrentUsername();
        break;
      case "--architecture":
        OSInfoManager.printNodeArchitecture();
        break;
      default:
        console.log("Invalid option. Try again.");
        break;
    }
  }

  static printEOL() {
    const eol = os.EOL;
    console.log(`End-Of-Line (EOL): ${eol}`);
  }

  static printCPUs() {
    const cpus = os.cpus();
    console.log("CPUs:");
    cpus.forEach((cpu, index) => {
      console.log(`CPU ${index + 1}:`);
      console.log(`  Model: ${cpu.model}`);
      console.log(`  Clock rate: ${(cpu.speed / 1000).toFixed(2)} GHz`);
    });
  }

  static printHomeDirectory() {
    const homedir = os.homedir();
    console.log(`Home Directory: ${homedir}`);
  }

  static printCurrentUsername() {
    const username = os.userInfo().username;
    console.log(`Current System User: ${username}`);
  }

  static printNodeArchitecture() {
    const architecture = process.arch;
    console.log(`Node.js Binary Architecture: ${architecture}`);
  }
}
