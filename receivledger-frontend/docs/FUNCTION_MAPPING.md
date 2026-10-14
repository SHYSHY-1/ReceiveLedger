# Frontend action → Solidity function

Demo implementation: `src/ledger/demoLedger.ts` (`demoLedger.<name>`). Real skeleton: `src/chain/chainLedger.ts`.

| UI action (page) | Contract function | Who may call | Reverts / outcomes |
|---|---|---|---|
| Approve investor (Investors) | `approveInvestor(address)` | manager | `Only manager can perform this action`, `Invalid investor address` |
| Revoke investor (Investors) | `revokeInvestor(address)` | manager | `Investor is not approved` |
| Issue fund units (Investors) | `issueFundUnits(address,uint256)` | manager | not approved; `Amount must be greater than zero`; `Maximum fund size exceeded` (cap S$1,000,000). Raises totalFundSize and availableFunds |
| Transfer units (Investors) | ERC-20 `transfer(to,amount)` via `_update` | approved investors | `Sender/Receiver is not an approved investor`; insufficient balance |
| Submit invoice (Invoices) | `submitInvoice(string,uint256,uint256)` | anyone (SME = msg.sender) | `Payer name is required`; amount > 0; `Maturity date must be in the future` |
| Approve (Invoices) | `approveInvoice(uint256)` | manager | `Invoice does not exist`; `Invoice is not awaiting approval` |
| Finance (Invoices) | `financeInvoice(uint256)` | manager | `Invoice has not been approved` reverts. Otherwise checks in order: matured, >90 days, amount > availableFunds, payer exposure > 10% of totalFundSize. **A failed check does not revert: invoice becomes Rejected with a reason (event `InvoiceRejected`)** |
| Record repayment (Invoices) | `recordRepayment(uint256)` | manager | `Invoice is not financed`. Principal only returns to availableFunds; no interest or fees on-chain |
| Exposure checker (Invoices) | reads `getPayerExposure(string)`, `getMaxPayerExposure()` | anyone | preview only |
| Dashboard figures | `totalFundSize`, `availableFunds`, `invoiceCount`, `invoices(id)` | read | outstanding = totalFundSize − availableFunds |
| Investor balances | `balanceOf`, `approvedInvestors` | read | decimals = 0, 1 RLU = S$1 |
| Transaction history | contract events | read | no on-chain event for "Reverted"; the demo logs reverts for teaching only |

Not in the contract (do not build UI for it): manual invoice rejection, interest/fees, investor list getter, redemption, fund-unit pricing.
Demo-only: "Advance demo clock" button, wallet/SME name labels, fake tx hashes.
