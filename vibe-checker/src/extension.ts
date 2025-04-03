import * as vscode from 'vscode';
import { ContextData } from './types/types';
import { getContext } from './utils/utils';
const path = require("path");



export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vibe-checker" is now active!');

    const disposable = vscode.commands.registerCommand('vibe-checker.reviewCode',
        async () => {
            // collect context
            const editor = vscode.window.activeTextEditor;
            const {input, language, file_name, line_count} = getContext(editor) ?? {};

            // TODO: implement call deepseek.ts

        });

    context.subscriptions.push(disposable);

}

export function deactivate() { }