import fs from "fs";
import os from "os";
import path from "path";
import crypto from "crypto";
import zlib from "zlib";
import readline from "readline";
import NavigationManager from "./navigation/navigation.js";
import FileOperationsManager from "./operations/fileOperations.js";
import HashManager from "./hash/hash.js";
import OSInfoManager from "./os/osInfo.js";

export { 
    fs, os, path, crypto, zlib, readline, 
    NavigationManager, FileOperationsManager,
    HashManager, OSInfoManager
};