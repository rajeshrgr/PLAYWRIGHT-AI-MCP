
# PLAYWRIGHT-AI-MCP
# Playwright Automation Framework (TypeScript + MCP)

A modern end‑to‑end (E2E) test automation framework built using **Playwright** and **TypeScript**, integrated with **MCP (Model Context Protocol)** servers to enable AI‑assisted workflows in **Visual Studio Code**.

This framework is designed for **scalability**, **maintainability**, and **future‑ready AI tooling support**.

---

## 🚀 Technology Stack

- **Playwright** – Cross‑browser automation (Chromium, Firefox, WebKit)
- **TypeScript** – Strong typing and better code quality
- **Node.js** – JavaScript runtime
- **MCP (Model Context Protocol)** – AI context integration
- **Visual Studio Code** – Recommended IDE
- **npm** – Package manager

---

## 📁 Project Structure

PLAYWRIGHT-AI-MCP/
│
├── src/
│   ├── tests/              # Test specifications
│   ├── pages/              # Page Object Models (POM)
│   ├── fixtures/           # Test fixtures
│   └── utils/              # Utility helpers
│
├── mcp/
│   └── server.ts           # Optional custom MCP server
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── .env
├── .gitignore
└── README.md

---

## ✅ Prerequisites

Ensure the following tools are installed:

- **Node.js** (v18 or later)
- **npm**
- **Git**
- **Visual Studio Code**
- **GitHub Copilot (recommended for MCP integration)**

Verify installation:

```bash
node -v
npm -v


📦 Installation
Clone the repository:
Shellgit clone https://github.com/<your-org>/PLAYWRIGHT-AI-MCP.gitcd PLAYWRIGHT-AI-MCPShow more lines
Install dependencies:
Shellnpm installShow more lines
Install Playwright browsers:
Shellnpx playwright install``Show more lines

▶️ Running Tests
Run all tests:
Shellnpx playwright testShow more lines
Run tests in headed mode:
Shellnpx playwright test --headedShow more lines
Run a specific test file:
Shellnpx playwright test example.spec.ts``Show more lines
View the HTML test report:
Shellnpx playwright show-reportShow more lines

🧱 Playwright Configuration
The main configuration file is:
playwright.config.ts

It includes:

Browser configuration
Parallel execution
Retry strategy
Base URL configuration
Reporting options


🧠 MCP (Model Context Protocol)
What is MCP?
MCP (Model Context Protocol) enables AI tools (such as GitHub Copilot in VS Code) to understand and interact with your project context, including:

Test files
Playwright configurations
Scripts
Repository metadata

This enables:

AI‑assisted test generation
Context‑aware code suggestions
Intelligent automation workflows


⚙️ MCP Server Configuration (Single File Setup)
Visual Studio Code MCP Configuration
Create the following file:
.vscode/mcp.json

Add the configuration below:
JSON{  "servers": {    "github": {      "type": "http",      "url": "https://api.githubcopilot.com/mcp"    },    "playwright": {      "command": "npx",      "args": ["-y", "@microsoft/mcp-server-playwright"]    }  }}``Show more lines

🔹 GitHub MCP Server
JSON{  "type": "http",  "url": "https://api.githubcopilot.com/mcp"}Show more lines
Purpose

Connects VS Code to GitHub Copilot’s MCP endpoint
Enables AI awareness of:

Repositories
Pull requests
Issues
Code structure



How it Works

HTTP‑based MCP server
Managed by GitHub
Requires an active GitHub Copilot subscription
No local process required

Use Cases

AI‑assisted code understanding
Context‑aware explanations
Smarter test suggestions


🔹 Playwright MCP Server
JSON{  "command": "npx",  "args": ["-y", "@microsoft/mcp-server-playwright"]}``Show more lines
Purpose

Starts a local MCP server for Playwright
Exposes Playwright APIs and test context to AI tools

How it Works

Uses npx to run the official Microsoft Playwright MCP server
-y auto‑confirms installation
Runs directly from the workspace

Capabilities

AI‑driven test generation
Understanding existing Playwright tests
Locator and assertion suggestions
Test refactoring assistance


▶️ MCP Server Startup Behavior


GitHub MCP Server

Runs remotely via HTTPS
No local startup required



Playwright MCP Server

Automatically started by VS Code using:
JSONnpx -y @microsoft/mcp-server-playwright``Show more lines



✅ No manual MCP startup required

🧪 Sample Test
JSONimport { test, expect } from "@playwright/test";test("Validate homepage title", async ({ page }) => {  await page.goto("https://example.com");  await expect(page).toHaveTitle(/Example/);});Show more lines

🌍 Environment Configuration
Create a .env file if required:
Plain Textenv isn’t fully supported. Syntax highlighting is based on Plain Text.BASE_URL=https://example.comUSERNAME=testuserPASSWORD=secretShow more lines

🧩 Recommended VS Code Extensions

Playwright Test for VS Code
GitHub Copilot
ESLint
Prettier
GitLens


✅ Best Practices Followed

Page Object Model (POM)
Type‑safe locators
Reusable utilities
Environment‑based configuration
Parallel test execution
AI‑ready MCP integration


📄 License
This project is licensed under the MIT License.

👨‍💻 Author
Rajesh G
QA Lead – Automation & AI Testing
Bengaluru, India