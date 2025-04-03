import * as vscode from 'vscode';
const path = require("path");

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vibe-checker" is now active!');

    const disposable = vscode.commands.registerCommand('vibe-checker.reviewCode',
        async () => {
            // collect context
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showInformationMessage("No active code editor - please open a file to review.");
                return;
            }
            if (!editor.selection.isEmpty) {
                vscode.window.showInformationMessage("Text has been selectedd");
            }
            // gather metadata
            const input = editor.document.getText();
            const language = editor.document.languageId;
            const file_name = path.basename(editor.document.fileName);
            const line_count = editor.document.lineCount;
            vscode.window.showInformationMessage(language);

            // TODO: implement call deepseek.ts
    
    });

    context.subscriptions.push(disposable);

}

export function deactivate() {}