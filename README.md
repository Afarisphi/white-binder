# 📑 White Binder

**White Binder** is a blockchain intelligence platform for investigating **online gambling activities** through **crypto wallet transaction analysis**.  
It addresses the lack of **open, user-friendly tools** for analyzing wallet interconnections and detecting suspicious transaction patterns on the blockchain.  

---

## ✨ Key Features

- **🔍 Wallet Analysis**  
  Input a wallet address to explore detailed transaction history, risk level classification, and overall behavioral insights.  

- **⚠️ Risk Detection Engine**  
  Automatically classifies transactions into **Low**, **Medium**, and **High** risk categories based on detected activity patterns.  

- **📊 Summary Dashboard**  
  Provides key statistics such as total transaction volume, number of transactions, and a breakdown by risk level.  

- **📈 Correlation Chart**  
  Interactive **Chart.js** visualization of correlation scores and wallet behavior trends over time.  

- **🌐 Wallet Flow Network**  
  Transaction flow visualization using **vis-network**, with color-coded nodes representing risk levels.  

- **💾 Save & Revisit**  
  Save wallet analysis results to **localStorage**, allowing users to revisit previously analyzed data without re-running the analysis.  

---

## 🧩 Project Architecture

This project is structured into multiple **Internet Computer (IC)** canisters:  

### 🔹 Backend Canister (Motoko)  
- Implements core business logic: transaction analysis, risk detection, data storage, and statistical calculations.  
- Exposes APIs consumed by the frontend.  
- **Main file:** `src/backend/main.mo`  

### 🔹 Frontend Canister (Vue + Tailwind)  
- Interactive web application with a modern UI built using:  
  - **Vue 3** for reactive components  
  - **Tailwind CSS** for styling  
  - **Chart.js** for data visualization  
  - **vis-network** for transaction graph rendering  
- **Source files:** `src/frontend/` (compiled and deployed as an `assets` canister)  

### 🔹 DFX Configuration (`dfx.json`)  
- Defines all canisters (`backend`, `frontend`) including:  
  - Programming language (Motoko / Assets)  
  - Source directories  
  - Network settings (`local`, `ic`)  

---

## 📌 Roadmap
- [ ] Add **multi-chain support** (Ethereum, BNB, Solana, ICP)  
- [ ] Integrate **AI-driven risk prediction models**  
- [ ] Provide **exportable investigation reports** (PDF/CSV)  
- [ ] Build **regulator dashboard** for compliance monitoring  

---

## 🛠️ Tech Stack
- **Motoko** – backend smart contract language (IC canisters)  
- **Vue 3** – frontend framework  
- **Tailwind CSS** – UI styling  
- **Chart.js** – analytics visualization  
- **vis-network** – wallet flow visualization  
- **DFX** – Internet Computer SDK  

---

## 🚀 Getting Started

### 1️⃣ Start the local replica
```bash
dfx start --background
```

### 2️⃣ Deploy canisters
```bash
dfx deploy
```

### 3️⃣ Access the app
```bash
http://localhost:4943?canisterId={asset_canister_id}
```