# `white-binder`

**White Binder** is a platform for investigating online gambling activities through **crypto wallet transaction analysis**.  
This project emerges as a solution to the lack of open tools for analyzing wallet interconnections and detecting suspicious transaction patterns on the blockchain.  

## ✨ Features

- **Wallet Analysis**  
  Enter a wallet address to view detailed transaction history, risk levels, and overall analysis.  

- **Risk Detection**  
  Classifies transactions into **Low**, **Medium**, and **High** risk categories based on detected activity patterns.  

- **Summary Dashboard**  
  Displays key statistics such as total volume, number of transactions, and breakdown of low-to-high risk activities.  

- **Correlation Chart**  
  Interactive chart powered by **Chart.js**, showing correlation scores over time.  

- **Wallet Flow Network**  
  Visualizes wallet transaction flows using **vis-network**, with color-coded nodes representing risk levels.  

- **Save Analysis**  
  Save wallet analysis results to **localStorage**, allowing users to revisit saved data without re-analyzing.  

---

## 🧩 Canister Structure

This project is composed of multiple canisters:  

### 🔹 Backend Canister (Motoko)  
- Contains the core business logic for transaction analysis, data storage, statistical calculations, and APIs used by the frontend.  
- **Main file**: `src/backend/main.mo`  

### 🔹 Frontend Canister (Vue + Tailwind)  
- Interactive web application with a modern UI built using **Vue 3**, **Tailwind CSS**, **Chart.js**, and **vis-network**.  
- **Source files**: `src/frontend/` → Vue build output is deployed as an `assets` canister.  

### 🔹 `dfx.json` (DFX Configuration)  
- Defines the canisters (`backend` and `frontend`), programming languages, source directories, and network settings (`local`, `ic`).  

---

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.
