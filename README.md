# ReceiveLedger
BF3124 Prototype

## Frontend handover

The complete React frontend is included in `ReceivLedger-complete.zip`.
Extract it to access the source code and project documentation.

### Run locally

Requires Node.js and npm.

```bash
cd receivledger-frontend
npm ci
npm run dev
```

### Features

- Dashboard with fund statistics, payer exposure and recent activity
- Invoice submission, approval, financing and repayment
- Investor approval, fund-unit issuance and transfers
- Transaction history with type and status filters
- Fictional demo data and simulated wallet roles

### Testing

- All 18 manual frontend test cases passed locally.
- All 7 automated demo-ledger tests passed.
- TypeScript checks and the production build passed.

```bash
npm test
npm run build
```

### Blockchain integration status

The frontend currently runs in Demo Mode. No real blockchain
transactions are sent, and Sepolia is not connected.

The project includes the unchanged `ReceivLedger.sol` contract
and an ethers.js integration scaffold. Person 3 will connect the
interface to MetaMask and the deployed contract, replace simulated
state with contract reads, and handle transaction outcomes.

### Documentation

Inside the extracted project:

- `docs/FUNCTION_MAPPING.md` — frontend actions mapped to Solidity functions
- `docs/HANDOVER.md` — project structure and integration steps
- `docs/EXPORT_REPORT.md` — verification results and known limitations

### Demo data

Reload the page to reset the demo.
Modify `src/demo/seed.ts` and `src/demo/demoData.ts` to change
the fictional data.
