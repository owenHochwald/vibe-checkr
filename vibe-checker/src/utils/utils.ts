import path from "path";
import * as vscode from 'vscode';
import { ContextData } from "../types/types";


export function getContext(editor: vscode.TextEditor | undefined): ContextData | undefined {
    if (!editor) {
        vscode.window.showInformationMessage("No active code editor - please open a file to review.");
        return;
    }
    const input = editor.selection.isEmpty ? editor.document.getText() : editor.document.getText(editor.selection);
    const language = editor.document.languageId;
    const file_name = path.basename(editor.document.fileName);
    const line_count = editor.document.lineCount;
    return { input, language, file_name, line_count };
}