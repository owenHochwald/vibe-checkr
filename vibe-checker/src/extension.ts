import * as vscode from 'vscode';
import { ContextData } from './types/types';
import { createEditorAnnotations, getContext } from './utils/utils';
import { analyzeCode } from './llm';



export function activate(context: vscode.ExtensionContext) {

    const disposable = vscode.commands.registerCommand('vibe-checker.reviewCode', async () => {
        // collect context
        const editor = vscode.window.activeTextEditor;
        const ctxData: ContextData = getContext(editor) ?? {
            input: '',
            language: '',
            file_name: '',
            line_count: 0
        };
        console.log(ctxData.input);

        // information to display to screen while awaiting response
        const lineInfo = ctxData.line_count > 1 ? "lines" : "line";
        const progressTitle = `Reviewing ${ctxData.line_count} ${ctxData.language} ${lineInfo} from ${ctxData.file_name}...`;


        vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: progressTitle,
                cancellable: false
            },
            async () => {
                if (ctxData.input.length > 0) {
                    try {
                        const results = await analyzeCode(ctxData);

                        if (!results) {
                            vscode.window.showErrorMessage("Failed to analyze code. Please try again.");
                            return;
                        }

                        const diagnostics = createEditorAnnotations(results);
                        const collection = vscode.languages.createDiagnosticCollection('deep-code-review');
                        if (editor) {
                            collection.set(editor.document.uri, diagnostics || []);
                        }

                        if (!diagnostics || diagnostics.length === 0) {
                            vscode.window.showInformationMessage("No issues found in the code.");
                        }
                    } catch (e: any) {
                        console.error("Error analyzing code:", e);
                        vscode.window.showErrorMessage("An error occurred during code analysis.");
                    }
                } else {
                    vscode.window.showWarningMessage("No code selected or file is empty.");
                }
            }
        );
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { };