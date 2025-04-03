import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vibe-checker" is now active!');

    const disposable = vscode.commands.registerCommand('vibe-checker.reviewCode',
        async () => {
            vscode.window.showInformationMessage(`Hello World`);
            // TODO: implement call deepseek.ts
    
    });

    context.subscriptions.push(disposable);

}

export function deactivate() {}