export interface ContextData {
    input: string;
    language: string;
    file_name: string;
    line_count: number;
}

export interface IssueData {
    title: string;
    line: number;
    severity: "Information" | "Error" | "Warning";
    description: string;
    suggested_fix?: string;
}