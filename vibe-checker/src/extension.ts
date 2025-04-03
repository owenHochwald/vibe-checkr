import * as vscode from 'vscode';
import { ContextData } from './types/types';
import { getContext } from './utils/utils';
import { analyzeCode } from './deepseek';


export function activate(context: vscode.ExtensionContext) {

    const disposable = vscode.commands.registerCommand('vibe-checker.reviewCode', async () => {
        vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: "Doing a deep analysis of your code...",
                cancellable: false
            },
            async () => {
                // collect context
                const editor = vscode.window.activeTextEditor;
                const ctxData: ContextData = getContext(editor) ?? {
                    input: '',
                    language: '',
                    file_name: '',
                    line_count: 0
                };

                if (ctxData.input.length > 0) {
                    try {
                        const results = await analyzeCode(ctxData);

                        const output = vscode.window.createOutputChannel("Code Review Results");
                        output.clear();
                        output.appendLine(results?.toString() || '');
                        output.show();

                    } catch (e: any) {
                        console.error("Error analyzing code:", e);
                    }
                }
            }
        );
    });

    context.subscriptions.push(disposable);


}

export function deactivate() { }