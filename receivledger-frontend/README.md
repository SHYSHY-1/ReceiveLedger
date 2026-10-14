# ReceivLedger Frontend (demo mode)

React + TypeScript + Vite dashboard for the ReceivLedger tokenised invoice-financing contract (`contracts/ReceivLedger.sol`, unmodified).
**Everything runs in the browser with fictional S$ data. No blockchain transaction is sent. Sepolia is not connected yet.**

## Requirements
Node.js 18+ (built and tested with Node 22) and npm.

## Run
```bash
npm ci             # install exact versions from package-lock.json
npm run dev        # http://localhost:5173
```
## Build, preview, check
```bash
npm run build      # typecheck + production build into dist/
npm run preview    # serve dist/
npm run typecheck
npm test           # 7 tests of the demo ledger rules
```
## Demo data: reset or modify
- State lives in memory only. **Reload the page to reset** to the seed.
- To change the seed (fund size, investors, invoices, payers, days to maturity): edit `src/demo/seed.ts`. Wallet addresses and name labels: `src/demo/demoData.ts`.
- The seed is built by calling the same ledger functions the UI calls, so it stays consistent (outstanding = total − available).

## Pages
Dashboard, Invoice management, Investors, Transaction history. Use "Acting as" (top right) to switch Fund manager / SME / Investor wallet.

## Docs
- `docs/FUNCTION_MAPPING.md`: frontend action to Solidity function mapping
- `docs/HANDOVER.md`: structure, simulated vs real parts, known issues, Sepolia plan
- `docs/EXPORT_REPORT.md`: current export verification and contract/demo limitations
