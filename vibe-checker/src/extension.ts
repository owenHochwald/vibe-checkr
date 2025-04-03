import * as vscode from 'vscode';
import { ContextData } from './types/types';
import { createEditorAnnotations, getContext } from './utils/utils';
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
                        // generate issues
                        const results = await analyzeCode(ctxData);

                        // create editor annotations show in "Problems"
                        const diagnostics = createEditorAnnotations(results);
                        const collection = vscode.languages.createDiagnosticCollection('deep-code-review');
                        if (editor) {
                            collection.set(editor.document.uri, diagnostics);
                        }

                    } catch (e: any) {
                        console.error("Error analyzing code:", e);
                    }
                }
            }
        );
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { };