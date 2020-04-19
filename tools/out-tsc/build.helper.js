"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs_1 = require("fs");
const path_1 = require("path");
// constants
const PROJECT_DIR = './projects/service';
const SRC_DIR = `${PROJECT_DIR}/src`;
// init program
const program = new commander_1.Command();
program.version('1.0.0')
    .description("CLI for applying values to the client template library.")
    .option('-d, --dir <path>', 'directory with the generated services')
    .option('-a, --api-name <name>', 'name of the API for which the client was generated for')
    .option('-n, --package-name <name>', 'name of the generated library (npm package name)')
    .option('-v, --package-version <version>', 'version of the generated library (npm package version)')
    .parse(process.argv);
// execute program
main();
function main() {
    const options = getOptions();
    if (!options.packageName) {
        logError('--package-name option is required');
        return;
    }
    if (!options.packageVersion) {
        logError('--package-version option is required');
        return;
    }
    const files = getTypeScriptFiles(options.dir);
    if (!files || !files.length) {
        return;
    }
    if (!copyFilesToLib(options.dir, files)) {
        return;
    }
    if (!exportServices(files)) {
        return;
    }
    if (!replacePlaceholder('#package-name#', options.packageName, path_1.join(PROJECT_DIR, 'package.json'))) {
        return;
    }
    if (!replacePlaceholder('#package-version#', options.packageVersion, path_1.join(PROJECT_DIR, 'package.json'))) {
        return;
    }
    let isApiNameReplacedReadme = false;
    let isApiNameReplacedPackage = false;
    if (options.apiName) {
        isApiNameReplacedReadme = replacePlaceholder('#api-name#', options.apiName, path_1.join(PROJECT_DIR, 'README.md'));
        isApiNameReplacedPackage = replacePlaceholder('#api-name#', options.apiName, path_1.join(PROJECT_DIR, 'package.json'));
    }
    else {
        logWarning(`--api-name was not set, --package-name used instead`);
        isApiNameReplacedReadme = replacePlaceholder('#api-name#', options.packageName, path_1.join(PROJECT_DIR, 'README.md'));
        isApiNameReplacedPackage = replacePlaceholder('#api-name#', options.packageName, path_1.join(PROJECT_DIR, 'package.json'));
    }
    if (!isApiNameReplacedReadme || !isApiNameReplacedPackage)
        return;
}
/**
 * Replace a placeholder in a file.
 * @param placeholder Placeholder to replace.
 * @param value Value to set.
 * @param filePath File path in which to process the replace.
 */
function replacePlaceholder(placeholder, value, filePath) {
    try {
        const fileContent = fs_1.readFileSync(filePath, 'utf8');
        const newFileContent = fileContent.replace(new RegExp(placeholder, 'g'), value);
        fs_1.writeFileSync(filePath, newFileContent);
        return true;
    }
    catch (error) {
        logError(error);
    }
    return false;
}
/**
 * Export the generated services in the public-api.
 * @param files Files with angular services:
 */
function exportServices(files) {
    try {
        const publicApi = path_1.join(SRC_DIR, 'public-api.ts');
        files.forEach(file => {
            const fileWithoutExtension = file.replace('.ts', '');
            fs_1.appendFileSync(publicApi, `\r\nexport * from './lib/${fileWithoutExtension}';`);
        });
        return true;
    }
    catch (error) {
        logError(error);
    }
    return false;
}
/**
 * Copy `files` from `sourceDir` to the angular lib folder.
 * @param sourceDir Directory containing files to copy.
 * @param files Files to copy from `sourceDir`.
 */
function copyFilesToLib(sourceDir, files) {
    try {
        files.forEach(file => {
            const fullPath = path_1.join(sourceDir, file);
            const destinationPath = path_1.join(SRC_DIR, 'lib', file);
            fs_1.copyFileSync(fullPath, destinationPath);
            logInfo(`${file} copied -> "${destinationPath}"`);
        });
        return true;
    }
    catch (error) {
        logError(error);
    }
    return false;
}
/**
 * Read files form directory.
 * @param path Directory path.
 */
function getTypeScriptFiles(path) {
    try {
        logInfo(`reading files from "${path}"`);
        const files = fs_1.readdirSync(path);
        return files.filter(f => f.endsWith('.ts'));
    }
    catch (error) {
        logError(error);
    }
    return null;
}
/**
 * Cast program to CliOptions interface.
 */
function getOptions() {
    return program;
}
/**
 * Log error to the console.
 * @param text Text to write as error to the console.
 */
function logInfo(text) {
    console.log("\x1b[32m%s\x1b[0m", text);
}
/**
 * Log warning to the console.
 * @param text Text to write as warning to the console.
 */
function logWarning(text) {
    console.log("\x1b[33m%s\x1b[0m", text);
}
/**
 * Log error to the console.
 * @param text Text to write as error to the console.
 */
function logError(text) {
    console.log("\x1b[31m%s\x1b[0m", text);
}
