"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const child_process_1 = require("child_process");
function activate(context) {
    console.log('Congratulations, your extension "vibe-checker" is now active!');
    const disposable = vscode.commands.registerCommand('vibe-checker.helloWorld', () => {
        // getting path to python script
        const pythonScriptPath = vscode.Uri.joinPath(context.extensionUri, 'src', 'scripts', 'main.py').fsPath;
        // spawning the process with test arguments
        const pythonProcess = (0, child_process_1.spawn)('python', [pythonScriptPath, 'hello', 'world']);
        // Handle stdout data
        pythonProcess.stdout?.on('data', (data) => {
            const output = data.toString().trim();
            vscode.window.showInformationMessage(`Output from Python: ${output}`);
        });
        // catches errors and shows to the screen
        pythonProcess.stderr?.on('data', (data) => {
            const errorMsg = data.toString().trim();
            vscode.window.showErrorMessage(`Python script error: ${errorMsg}`);
        });
        // listen for when python process is finished
        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                vscode.window.showErrorMessage(`Python process exited with code ${code}`);
            }
        });
        // Add a timeout error in case the process hangs
        const timeout = setTimeout(() => {
            vscode.window.showWarningMessage('Python process seems to be taking too long. Check the logs.');
        }, 5000);
        pythonProcess.on('exit', () => {
            clearTimeout(timeout);
        });
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map