# Local LLM Enterprise Assistant

> **Privacy-first AI for enterprise software management — powered by a Local Large Language Model.**

### Overview

**Local LLM Enterprise Assistant** is an ongoing research and development project that explores how **locally hosted Large Language Models (LLMs)** can support enterprise software management while ensuring that sensitive information never leaves an organization's infrastructure.

Many organizations use cloud-based AI services to analyze software packages, identify updates, summarize release notes, and provide recommendations directly within developer tools. While these services offer powerful capabilities, they often require sending software metadata or project information to external servers, which may not be suitable for organizations with strict privacy, security, or compliance requirements.

This project investigates an alternative approach by integrating a **Local LLM** that runs entirely on the user's machine using **Ollama**. All AI inference is performed locally, enabling intelligent assistance without relying on cloud-hosted AI services.

The repository contains a collection of proof-of-concept implementations that validate different components required to build a privacy-preserving enterprise AI assistant.


### Project Vision

The long-term goal is to develop a Local LLM-powered assistant capable of helping developers and IT teams manage software more efficiently while keeping all processing on local infrastructure.

The envisioned system will be able to:

* Monitor installed software and package versions
* Detect available software updates
* Explain update recommendations in natural language
* Summarize release notes
* Highlight important security and vulnerability information
* Integrate directly into developer tools such as Visual Studio Code
* Operate entirely offline using a Local LLM

Rather than building everything at once, the project follows an incremental approach where each proof of concept validates a specific part of the overall workflow.


### Repository Structure

```text
local-llm-enterprise-assistant/

├── html-version-monitor/
│   ├── README.md
│   └── ...
│
├── vscode-version-monitor/
│   ├── README.md
│   └── ...
│
├── docs/
│   ├── architecture/
│   ├── diagrams/
│   └── research/
│
├── images/
│
└── README.md
```

Each subproject focuses on a different stage of the overall system while sharing the same long-term vision.


### Proof of Concepts

#### Phase 1 — HTML Version Monitor

#### Objective

The first proof of concept demonstrates the core software version comparison workflow using a lightweight web interface.

The goal of this phase is to validate the update detection logic before introducing AI-powered recommendations.

#### Workflow

1. Read installed application versions from a local JSON file.
2. Read the latest available versions from a simulated version database.
3. Compare installed and latest versions.
4. Detect whether an update is available.
5. Display the result through a simple web interface.

#### Technologies

* Python
* HTML
* CSS
* JSON

#### Features

* Reads installed application versions
* Reads latest software versions from a local database
* Compares installed and latest versions
* Detects available updates
* Displays update information through a browser interface

#### Purpose

This phase validates the core business logic independently from AI integration, ensuring the update detection workflow is reliable before introducing additional components.

### Phase 2 — VS Code Version Monitor Extension

#### Objective

The second proof of concept integrates the version monitoring workflow directly into **Visual Studio Code**.

Instead of viewing update information in a browser, developers receive update notifications directly inside their editor through a Hover Provider.

When an update is detected, the extension communicates with a **Local LLM** running through **Ollama** to generate a concise recommendation.

#### Workflow

1. User hovers over an application name.
2. Read installed application versions.
3. Read the latest available versions.
4. Compare versions.
5. Detect available updates.
6. Request an AI recommendation from the Local LLM.
7. Display the result within VS Code.

#### Technologies

* JavaScript
* Node.js
* Visual Studio Code Extension API
* Ollama
* Gemma 3 4B
* JSON

#### Features

* VS Code Hover Provider
* Local version comparison
* Local LLM integration
* Offline AI recommendations
* Modular architecture
* Privacy-first design


### Why a Local LLM?

Traditional AI assistants typically rely on cloud-hosted models, requiring software information to be transmitted to external services.

This project demonstrates an alternative approach where every stage of the workflow executes locally.

Benefits include:

* Improved privacy
* Better control over enterprise data
* Offline operation
* Reduced dependence on cloud services
* Easier compliance with organizational security policies

While the current implementation focuses on version monitoring, the same architecture can support many additional enterprise AI use cases.


### Current Architecture

```text
                     User
                       │
                       ▼
              Version Monitor
                       │
        ┌──────────────┴──────────────┐
        │                             │
Installed Applications        Latest Version Database
        │                             │
        └──────────────┬──────────────┘
                       │
              Version Comparison
                       │
             Update Available?
                 │            │
                No           Yes
                 │            │
                 ▼            ▼
          Show Status    Local LLM (Ollama)
                              │
                              ▼
                   AI Recommendation
                              │
                              ▼
                    Display Result
```


### Roadmap

#### Phase 1

* HTML version monitoring prototype
* Local version comparison
* Simulated version database

## ##Phase 2

* VS Code extension
* Hover Provider
* Local LLM integration using Ollama

#### Planned Improvements

* Semantic version comparison
* Automatic application discovery
* Live software version sources
* Vendor API integration
* Release note summarization
* CVE and vulnerability awareness
* AI-generated update explanations
* Intelligent caching
* Improved prompt engineering
* Performance optimization
* Enterprise policy support


### Current Limitations

As a proof of concept, the project intentionally prioritizes architecture validation over production-ready implementation.

Current limitations include:

* Latest software versions are stored locally instead of being retrieved from live services.
* Version comparison uses basic equality checks rather than semantic versioning.
* JSON files are read for each request.
* AI responses are generated on demand without caching.
* Initial requests may experience model startup latency while Ollama loads the Local LLM.
* AI recommendations are intentionally concise.

These limitations are expected and will be addressed in future phases.


### Technology Stack

* JavaScript
* Python
* Node.js
* Visual Studio Code Extension API
* Ollama
* Gemma 3 4B
* HTML
* CSS
* JSON


### Future Direction

This repository is intended to evolve beyond software version monitoring.

Future work will explore how Local LLMs can assist enterprise software teams with:

* Software lifecycle management
* Vulnerability awareness
* Developer productivity
* Release intelligence
* Knowledge assistance
* Secure AI-powered tooling

The objective is to demonstrate that Local LLMs can provide practical AI capabilities while maintaining complete control over enterprise data.


### Author

**Sanskriti**

Research Project — Local LLMs for Enterprise Software Assistance
