export interface ContextData {
    input: String,
    language: String,
    file_name: String,
    line_count : number;
}

export interface IssueData {
    title: String,
    line: number,
    severity : number,
    description: String;
}