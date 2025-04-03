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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContext = getContext;
exports.createEditorAnnotations = createEditorAnnotations;
const path_1 = __importDefault(require("path"));
const vscode = __importStar(require("vscode"));
function getContext(editor) {
    if (!editor) {
        vscode.window.showInformationMessage("No active code editor - please open a file to review.");
        return;
    }
    const input = editor.selection.isEmpty ? editor.document.getText() : editor.document.getText(editor.selection);
    const language = editor.document.languageId;
    const file_name = path_1.default.basename(editor.document.fileName);
    const line_count = editor.document.lineCount;
    return { input, language, file_name, line_count };
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
        // cast to an explict type if model hasn't already
        const severity = issue.severity;
        const diagnostic = generateDiagnostic(line, issue.title, severity);
        if (diagnostic) {
            diagnostics.push(diagnostic);
        }
    });
    return diagnostics;
}
function generateDiagnostic(line, title, severity) {
    const severityMap = {
        Information: vscode.DiagnosticSeverity.Information,
        Error: vscode.DiagnosticSeverity.Error,
        Warning: vscode.DiagnosticSeverity.Warning
    };
    const diagnosticSeverity = severityMap[severity];
    if (!diagnosticSeverity) {
        return undefined;
    }
    const range = new vscode.Range(line, 0, line, Number.MAX_SAFE_INTEGER);
    const diagnostic = new vscode.Diagnostic(range, title.toString(), diagnosticSeverity);
    return diagnostic;
}
//# sourceMappingURL=utils.js.map