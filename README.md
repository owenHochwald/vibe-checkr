# Vibe Checkr - VS Code Extension
Vibe Checker is a Visual Studio Code extension designed to "vibe check" your code and ensure it meets the required tasks and standards. It leverages AI-powered analysis to review your code, identify potential issues, and provide actionable feedback directly in the editor.

--------------

## Features
- AI-Powered Code Review: Analyze your code using OpenAI's API to identify bugs, potential issues, and areas for improvement.
- Inline Diagnostics: Highlights issues directly in the editor and lists them in the "Problems" panel.
- Language-Agnostic: Works with 100+ programming languages supported by VS Code.
- Seamless Integration: Runs directly from the command palette or via a customizable keyboard shortcut.
--------------

## How It Works
- Collect Context: The extension gathers the active file's content, language, and metadata.
- Analyze Code: Sends the collected data to OpenAI's API for analysis using a predefined prompt.
- Generate Feedback: Parses the AI's response and highlights issues in the editor.
- Display Results: Issues are displayed in the "Problems" panel with detailed descriptions.

-------------
## Usage
1. Open a file in VS Code to review the entire file or select lines of code for a focused check.
2. Run the command Review Code from the command palette (Ctrl+Shift+P).
3. Wait for the analysis to complete (this may take a minute, we're working on speeding up the process!).
4. Review the highlighted issues in the editor and the "Problems" panel.

-------------

## Known Issues
- Large files may take longer to analyze due to API limitations.

## Contributing
Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.
