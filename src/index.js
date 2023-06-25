import {readline, os, NavigationManager} from './modules.js';

const consoleInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
});

process.chdir(os.homedir());

const args = process.argv.slice(2);
const username = args.find(arg => arg.startsWith('--username=')).split('=')[1];

const navigation = new NavigationManager();

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${process.cwd()}`);

consoleInterface.prompt();
consoleInterface.on('line', async input => {
    const [command, ...params] = input.trim().split(' ');

    try {
        switch (command) {
            case 'test':
                console.log("Test");
                break;
            case 'up':
                await navigation.goUp();
                break;
            case 'ls':
                await navigation.listDirectoryContent();
                break;
            case 'cd':
                await navigation.changeDirectory(params[0]);
                break;
            case 'fail':
                // error test
                throw new Error();
            case '.exit':
                consoleInterface.close();
                break;
            default:
                console.log('Invalid command. Try again.');
                break;
        }
    } catch (error) {
        console.log("Operation failed. Check if the file or path exists and try again.");
    }
    console.log(`You are currently in ${process.cwd()}`);
    consoleInterface.prompt();
});

consoleInterface.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
});
