#PLAYWRIGHT-AI-MCP
# Playwright Automation Framework (TypeScript + MCP)

A modern end‑to‑end (E2E) test automation framework built with **Playwright** and **TypeScript**, integrated with an **MCP (Model Context Protocol) server** for AI‑assisted workflows in **Visual Studio Code**.

This framework is designed for scalability, maintainability, and future‑ready AI tooling support.

---

## 🚀 Technology Stack

- **Playwright** – Cross‑browser automation (Chromium, Firefox, WebKit)
- **TypeScript** – Strong typing and better code quality
- **Node.js** – JavaScript runtime
- **MCP Server** – Model Context Protocol integration
- **Visual Studio Code** – Recommended IDE
- **npm** – Package manager

---

## 📁 Project Structure

## ✅ Prerequisites

Make sure the following tools are installed:

- **Node.js** (v18 or later)
- **npm**
- **Git**
- **Visual Studio Code**

Verify installation:

```bash
node -v
npm -v

Installation
Clone the repository

git clone https://github.com/<your-org>/PLAYWRIGHT-AI-MCP.git
cd PLAYWRIGHT-AI-MCP

npm install
npx playwright install

# Running all test cases
npx playwright test

# Run tests in headed mode:
npx playwright test --headed

# Run a specific test file:
npx playwright test example.spec.ts

# Generate and view the test report:
npx playwright show-report

Playwright Configuration
The main configuration is located in:
playwright.config.ts
This includes:

Browser configuration
Parallel execution
Retries
Base URL
Reporting options


MCP (Model Context Protocol)
What is MCP?
MCP (Model Context Protocol) enables AI tools and editors (like VS Code) to interact with your project context such as:

Test files
Configurations
Scripts
Project metadata

This allows for:

AI‑assisted test generation
Context‑aware suggestions
Intelligent automation workflows

⚙️ MCP Server Configuration
MCP Server Example
Create the MCP server in mcp/server.ts:
TypeScriptimport { Server } from "@modelcontextprotocol/sdk/server";const server = new Server({  name: "playwright-mcp-server",  version: "1.0.0",});server.start();Show more lines
Start the MCP server:
Shellnode mcp/server.tsShow more lines

Visual Studio Code MCP Setup
Create the following file:
.vscode/mcp.json

Add this configuration:


{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@microsoft/mcp-server-playwright"]
    }
  }
}

GitHub MCP Server

"github": {
  "type": "http",
  "url": "https://api.githubcopilot.com/mcp"
}

✅ Purpose:

Connects VS Code to GitHub Copilot’s MCP endpoint
Enables AI context awareness across:

Repositories
Issues
Pull requests
Code structure



✅ How it works:

Uses an HTTP‑based MCP server
Managed automatically by GitHub
Requires an active GitHub Copilot subscription
No local process required

✅ Typical use cases:

AI‑assisted code understanding
Context‑aware explanations
Smarter test suggestions


2️⃣ Playwright MCP Server

playwright": {
  "command": "npx",
  "args": ["-y", "@microsoft/mcp-server-playwright"]
}

✅ Purpose:

Starts a local MCP server for Playwright
Exposes Playwright APIs and test context to AI tools

✅ How it works:

Uses npx to run the official Playwright MCP server
-y auto‑confirms package installation
Runs directly from your project workspace

✅ Capabilities:

AI‑driven test generation
Understanding existing Playwright tests
Suggesting locators and assertions
Test refactoring assistance


▶️ How the MCP Servers Are Started


GitHub MCP:
Runs remotely via HTTPS (no local command)


Playwright MCP:
Started automatically by VS Code using:
Shellnpx -y @microsoft/mcp-server-playwrightShow more lines


No manual startup is required.

✅ Prerequisites
Make sure you have:

Node.js 18+
npm
Visual Studio Code
GitHub Copilot enabled

Verify Node:
