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
const utils_1 = require("./utils/utils");
const deepseek_1 = require("./deepseek");
function activate(context) {
    const disposable = vscode.commands.registerCommand('vibe-checker.reviewCode', async () => {
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Doing a deep analysis of your code...",
            cancellable: false
        }, async () => {
            // collect context
            const editor = vscode.window.activeTextEditor;
            const ctxData = (0, utils_1.getContext)(editor) ?? {
                input: '',
                language: '',
                file_name: '',
                line_count: 0
            };
            if (ctxData.input.length > 0) {
                try {
                    const results = await (0, deepseek_1.analyzeCode)(ctxData);
                    const diagnostics = createEditorAnnotations(results);
                    const collection = vscode.languages.createDiagnosticCollection('deep-code-review');
                    if (editor) {
                        collection.set(editor.document.uri, diagnostics);
                    }
                }
                catch (e) {
                    console.error("Error analyzing code:", e);
                }
            }
        });
    });
    context.subscriptions.push(disposable);
}
function createEditorAnnotations(issues) {
    let parsedIssues;
    // parse input
    if (typeof issues === "string") {
        try {
            parsedIssues = JSON.parse(issues);
        }
        catch (error) {
            console.error("Invalid JSON string:", error);
            return;
        }
    }
    else {
        parsedIssues = issues;
    }
    // ensure parsedIssues is valid
    if (!parsedIssues || !Array.isArray(parsedIssues.issues)) {
        console.error("Parsed issues are not in the expected format:", parsedIssues);
        return;
    }
    const diagnostics = [];
    parsedIssues.issues.forEach((issue) => {
        const line = issue.line - 1;
        const range = new vscode.Range(line, 0, line, Number.MAX_SAFE_INTEGER);
        const diagnostic = new vscode.Diagnostic(range, issue.title.toString(), vscode.DiagnosticSeverity.Warning);
        diagnostics.push(diagnostic);
    });
    return diagnostics;
}
function deactivate() { }
;
//# sourceMappingURL=extension.js.map