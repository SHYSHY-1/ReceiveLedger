# Handover (for Codex / teammates)

## Structure
```
contracts/ReceivLedger.sol   source of truth, do not modify
src/constants.ts             MAX_PCT, MAX_DAYS, MAX_FUND, status enum order (mirror the contract)
src/types.ts                 State, Invoice, LogEntry, RunFn
src/format.ts                money/date helpers, pkey() = contract's lower-case payer normalisation
src/ledger/demoLedger.ts     SIMULATED ledger: one function per contract function, same checks and revert text
src/ledger/demoLedger.test.ts
src/demo/demoData.ts, seed.ts  SIMULATED fictional data (addresses, labels, seed fund and invoices)
src/chain/                   REAL-integration skeleton (abi.ts, wallet.ts, chainLedger.ts): unused, untested
src/components/              ui.tsx (badges, table), charts.tsx (inline SVG charts)
src/pages/                   Dashboard, Invoices, Investors, History
src/App.tsx                  shell, role switcher, toast, run() wrapper
src/styles.css               design (navy/white/teal), unchanged from the Claude Artifact
```
## How the demo works
`run(fn)` in `App.tsx` clones the state, calls a `demoLedger` function with `caller` set from "Acting as", and commits the clone. A thrown Error is a contract revert: it is logged as status Reverted and shown as a red toast. A failed financing check returns a reason (not a throw), as in Solidity.

## Simulated now
All state, balances, timestamps, tx hashes, wallet roles, the demo clock, SME/investor names.

## Needed for Sepolia (not done)
1. Deploy contract (teammate); store address + chain id in `.env` (`VITE_CONTRACT_ADDRESS`).
2. Make the ledger layer async: define a `LedgerService` interface, wrap `demoLedger` and `ChainLedger` behind it, and change `run()` to await it. Pages call `demoLedger.*` directly today; swap those calls to the service.
3. Replace `State` with data read from `totalFundSize`, `availableFunds`, `invoiceCount`, `invoices(i)`, `balanceOf`, `getPayerExposure`.
4. Rebuild investors list and history from event logs (`queryFilter`); the contract has no investor enumeration.
5. Use `connectWallet()`; derive role from `contract.manager()` vs the connected address instead of the "Acting as" switcher.
6. Convert units: maturity is unix **seconds** on-chain (demo uses ms); amounts are integer S$ (bigint); status is the uint8 enum.
7. After `financeInvoice`, check logs for `InvoiceRejected` vs `InvoiceFinanced`; show real tx hashes with Etherscan links; handle pending/failed transactions.

## Known issues / limitations
- UI code is a faithful port of the Claude Artifact and uses dense, long lines and inline styles; refactor gradually.
- Verified: typecheck, 7 unit tests, production build. **Not verified:** visual/browser check of the ZIP build, mobile layout, any real wallet or Sepolia interaction, `src/chain/*` against a deployed contract.
- Charts are hand-written SVG (no chart library).
- No persistence: reload resets the demo.
- Payer exposure is derived from Financed invoices, matching the contract's counter.
- The contract's lower-casing covers ASCII A–Z only; `pkey()` does the same.
