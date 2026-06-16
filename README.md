Welcome to the official technical documentation for **Olympus**, the backend conversational engine for **ZapBill**. This repository contains the structural architecture, playbook definitions, and data store schemas used to deploy a high-performing utility-savings assistant for the Italian market.

---

## 🏗️ System Architecture

Olympus uses a decoupled **Hub-and-Spoke** architecture. To ensure maximum predictability and prevent conversational drifting, the calculation layers (analytical sub-agents) are strictly separated from the presentation layers (formatting sub-agents, designated as "Eco").

              ┌──────────────────────┐
              │ Chrono-Orchestrator  │ ──► Onboarding, OCR & Routing
              └──────────────────────┘
                         │
     ┌───────────────────┼───────────────────┐
     ▼                   ▼                   ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  Zeus - Luce   │  │   Elio - Gas   │  │Hermes-Internet │ ──► Analysis & Computation
└────────────────┘  └────────────────┘  └────────────────┘
│                   │                   │
▼                   ▼                   ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│   Eco-Zeus     │  │   Eco-Elio     │  │   Eco-Hermes   │ ──► Presentation & Style
└────────────────┘  └────────────────┘  └────────────────┘

---

## 📋 Playbook Specifications

### 1. Chrono - Orchestrator
* **Goal**: Greet the user, determine their utility intent (Electricity, Gas, or Internet), handle multi-modal inputs (PDF/images of bills via OCR), extract initial context parameters, and seamlessly route to the respective calculation vertical without losing session data.
* **Onboarding Policy**: Greets users in English. 
* **Unsupported Languages**: If an unsupported language is detected, it politely apologizes, names the detected language, states its limitation to English, and presents the standard English greeting.
* **Error Handling**: If OCR extraction fails or returns ambiguous data, it bypasses loops by asking a single, direct clarifying question to collect the missing data manually.
* **Routing Targets**: Routes to `${PLAYBOOK:Zeus - Luce}` for electricity, `${PLAYBOOK:Elio - Gas}` for gas, and `${PLAYBOOK:Hermes - Internet}` for internet requests.
* **Guardrails**: Instantly rejects out-of-scope requests such as billing disputes, complaints, legal/medical questions, meter-reading errors, or general customer support.

### 2. Computational Verticals (Zeus, Elio, Hermes)
* **Goal**: Silently verify context parameters, collect missing data in a single consolidated request, pull market data, execute cost calculations, and pass a structured summary to the presentation layer.
* **Mandatory Parameters (Luce & Gas)**: Requires `current_provider`, `latest_amount_paid`, `total_consumption`, `zip_code`, and `rate_type`.
* **Mandatory Parameters (Internet)**: Requires `current_provider`, `latest_amount_paid`, `connection_speed`, `technology`, and `zip_code`.
* **Collection Template**: If parameters are missing, the agent asks for all of them simultaneously using the format: `- [User Friendly Name]: [Brief description]`.
* **Data Retrieval**: Queries `${TOOL:ZapBill_Retriever}` with specific literal terms: `"Price_Eur_kWh"` for electricity, `"Price_Eur_Smc"` for gas, and `"Monthly_Fee_Eur"` for internet.

### 3. Output Layer Sub-Agents (Eco-Zeus, Eco-Elio, Eco-Hermes)
* **Goal**: Take the computed data from the calculation playbooks and render the final comparison to the user.
* **Style Constraints**: Text outside the table must be under 150 words. 
* **Tone Guardrails**: It must use factual, precise language, strictly avoiding speculative terms like "I think", "Penso che", or "Secondo me".
* **Localization**: All currency values must use the EUR (€) symbol and follow Italian formatting (e.g., `1.000,50 €`).
* **Language Enforcement**: The response must strictly match the language defined by the `user_language` parameter. If set to "Italian", asking questions or writing text in English is strictly forbidden.

---

## 🧮 Computational Logic & Financial Formulas

To eliminate calculation errors, all mathematical operations must be evaluated using the `${TOOL:code-interpreter}`. Projections are annualized based on standard Italian retail utility billing frequencies.

### Energy Projections (Luce & Gas)
Energy bills are computed assuming a standard bi-monthly billing cycle (6 bills per year).
* **Current Annual Cost**: Calculated as $\text{latest\_amount\_paid} \times 6$.
* **Estimated Annual Cost**: Calculated as $(\text{Offer Unit Price} \times \text{total\_consumption} \times 6) + \text{Fixed\_Fee\_Eur\_Year}$.
* **Net Annual Savings**: Calculated as $\text{Current Annual Cost} - \text{Estimated Annual Cost}$.

### Connectivity Projections (Internet)
Internet plans are computed on a flat monthly rate while factoring in upfront setup fees.
* **Current Annual Cost**: Calculated as $\text{latest\_amount\_paid} \times 12$.
* **Estimated First-Year Cost**: Calculated as $(\text{Monthly\_Fee\_Eur} \times 12) + \text{Activation\_Cost\_Eur}$.
* **Net First-Year Savings**: Calculated as $\text{Current Annual Cost} - \text{Estimated First-Year Cost}$.

---

## 🗄️ Data Store Schema

The agent reads from three indexed text databases inside the data store via `${TOOL:ZapBill_Retriever}`:

| Database File | Key Fields Copied from Schema |
| :--- | :--- |
| `Electricity_offers.txt` | Fornitore, Nome_Offerta, Tipo_Tariffa, Prezzo_Unita (€/kWh), Quota_Fissa_Annuale, URL_Offerta |
| `Gas_offers.txt` | Fornitore, Nome_Offerta, Tipo_Tariffa, Prezzo_Unita (€/Smc), Quota_Fissa_Annuale, URL_Offerta |
| `Internet_offers.txt` | Fornitore, Nome_Offerta, Tecnologia (FTTH/FTTC/FWA), Costo_Mensile, Costo_Attivazione, URL_Offerta |

---

## 📋 Markdown Layout Templates

The Eco sub-agents are restricted to rendering output tables using the exact visual structures shown below:

### ⚡ Electricity & Gas Output Layout

### Here are your estimated savings
| Provider | Offer name | Estimated cost | Estimated saving over year | Source web link |
|---|---|---|---|---|
| Example Prov | Example Offer | 250,00 € | 50,00 € | [https://example.com](https://example.com) |

> **ZapBill's Note**: "By switching to one of these plans, you'll start saving on your bills right away. Click on the link for the offer you prefer to visit the provider's website and follow the instructions to switch plans."

### 🌐 Internet Output Layout

### Here are your estimated internet savings
| Provider | Offer name | Estimated cost | Estimated saving over year | Source web link |
|---|---|---|---|---|
| Example Net | Fiber Speed | 300,00 € | 60,00 € | [https://example.com](https://example.com) |

> **ZapBill's Note**: "By switching to one of these plans, you'll start saving on your internet bills right away. Click on the link for the offer you prefer to visit the provider's website and follow the instructions to switch plans."

---

## 💻 Frontend Web Application (React & TypeScript)

The user interface of ZapBill is a modern, responsive single-page web application built with **React**, **TypeScript**, **Vite**, and styled with **Tailwind CSS v4** using the dark "Olympus" theme design.

It embeds the Dialogflow Messenger conversational agent statically at the root to ensure a robust connection, then dynamically layout-mounts the chat window to be the central focus of the page. This guarantees that complex Markdown billing comparison tables have plenty of horizontal space to render perfectly.

### 📁 Project Architecture & GitHub Structure
The repository ([hikarufn/ZapBill](https://github.com/hikarufn/ZapBill)) is organized as follows:

```text
ZapBill/
├── package.json          # Node.js dependencies (React, Vite, Tailwind CSS v4, TypeScript)
├── vite.config.ts        # Vite server and compiler configurations (React and Tailwind plugins)
├── tsconfig.json         # TypeScript options for bundler modules and JSX
├── index.html            # Main HTML document declaring the static Google Dialogflow Messenger elements
└── src/
    ├── main.tsx          # App entrypoint for mounting React in the DOM
    ├── vite-env.d.ts     # Client types and JSX namespace definitions for Dialogflow Custom Elements
    ├── App.tsx           # Main layout coordinating background components, headers, and the chat box
    ├── styles/
    │   └── index.css     # CSS imports, Tailwind directives, custom scrollbars, and chatbot color overrides
    └── components/
        ├── Background.tsx # Absolute positioned SVG mountains and misty visual layout
        ├── Header.tsx     # Branding elements (Lightning Logo, ZapBill title, tagline container)
        └── ChatInterface.tsx # Wrapper that secures and embeds the static Dialogflow chatbot container
```

### 🚀 Running the Project

To run this application locally, ensure you have **Node.js** (v18+) installed.

#### 1. Install Dependencies
Installs React, TypeScript compiler, Vite bundler, and Tailwind CSS v4 packages:
```bash
npm install
```

#### 2. Start the Development Server
Runs the Vite local server with hot reloading:
```bash
npm run dev
```
Once started, navigate to [http://localhost:5173/](http://localhost:5173/) in your browser.

#### 3. Compile and Build for Production
Compiles TypeScript files and generates minified, production-ready static assets in the `dist/` directory:
```bash
npm run build
```

#### 4. Preview the Production Build
Launches a local web server to preview the built assets:
```bash
npm run preview
```