import * as vscode from 'vscode';
import { spawn, ChildProcess } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vibe-checker" is now active!');

    const disposable = vscode.commands.registerCommand('vibe-checker.helloWorld', () => {
        // getting path to python script
        const pythonScriptPath: string = vscode.Uri.joinPath(context.extensionUri, 'src', 'scripts', 'main.py').fsPath;

        // spawning the process with test arguments
        const pythonProcess: ChildProcess = spawn('python', [pythonScriptPath, 'hello', 'world']);
        
        // Handle stdout data
        pythonProcess.stdout?.on('data', (data: Buffer) => {
            const output: string = data.toString().trim();
            vscode.window.showInformationMessage(`Output from Python: ${output}`);
        });
        
        // catches errors and shows to the screen
        pythonProcess.stderr?.on('data', (data: Buffer) => {
            const errorMsg: string = data.toString().trim();
            vscode.window.showErrorMessage(`Python script error: ${errorMsg}`);
        });
        
        // listen for when python process is finished
        pythonProcess.on('close', (code: number | null) => {
            if (code !== 0) {
                vscode.window.showErrorMessage(`Python process exited with code ${code}`);
            }
        });
        
        // Add a timeout error in case the process hangs
        const timeout: NodeJS.Timeout = setTimeout(() => {
            vscode.window.showWarningMessage('Python process seems to be taking too long. Check the logs.');
        }, 5000);
        
        pythonProcess.on('exit', () => {
            clearTimeout(timeout);
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}