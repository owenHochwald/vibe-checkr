import * as vscode from 'vscode';
import { ContextData, IssueData } from './types/types';
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

function createEditorAnnotations(issues: any): vscode.Diagnostic[] | undefined  {
    let parsedIssues;

    // parse input
    if (typeof issues === "string") {
        try {
            parsedIssues = JSON.parse(issues);
        } catch (error) {
            console.error("Invalid JSON string:", error);
            return;
        }
    } else {
        parsedIssues = issues;
    }

    // ensure parsedIssues is valid
    if (!parsedIssues || !Array.isArray(parsedIssues.issues)) {
        console.error("Parsed issues are not in the expected format:", parsedIssues);
        return;
    }

    const diagnostics: vscode.Diagnostic[] = [];

    parsedIssues.issues.forEach((issue: IssueData) => {
        const line = issue.line - 1;
        const range = new vscode.Range(line, 0, line, Number.MAX_SAFE_INTEGER);
        const diagnostic = new vscode.Diagnostic(range, issue.title.toString(), vscode.DiagnosticSeverity.Warning);
        diagnostics.push(diagnostic);
    });
    return diagnostics;

}

export function deactivate() { };