import { Contract, type ContractRunner } from 'ethers';
import { RECEIVLEDGER_ABI } from './abi';

/**
 * NOT USED YET, NOT TESTED AGAINST A DEPLOYED CONTRACT.
 * Skeleton of the real implementation. Every method maps 1:1 to src/ledger/demoLedger.ts.
 * Differences Codex must handle: calls are async and return transactions (await tx.wait()), reverts surface as
 * ethers errors (decode with contract.interface), amounts are bigint, and state must be rebuilt from view calls + event logs.
 */
export class ChainLedger {
  readonly contract: Contract;
  constructor(address: string, runner: ContractRunner) { this.contract = new Contract(address, RECEIVLEDGER_ABI, runner); }
  async approveInvestor(a: string) { return (await this.contract.approveInvestor(a)).wait(); }
  async revokeInvestor(a: string) { return (await this.contract.revokeInvestor(a)).wait(); }
  async issueFundUnits(a: string, units: number) { return (await this.contract.issueFundUnits(a, units)).wait(); }
  async transfer(to: string, units: number) { return (await this.contract.transfer(to, units)).wait(); }
  async submitInvoice(payer: string, amount: number, maturitySeconds: number) { return (await this.contract.submitInvoice(payer, amount, maturitySeconds)).wait(); } // contract expects seconds, demo uses ms
  async approveInvoice(id: number) { return (await this.contract.approveInvoice(id)).wait(); }
  async financeInvoice(id: number) { return (await this.contract.financeInvoice(id)).wait(); } // check logs for InvoiceRejected vs InvoiceFinanced
  async recordRepayment(id: number) { return (await this.contract.recordRepayment(id)).wait(); }
  async getPayerExposure(payer: string): Promise<bigint> { return this.contract.getPayerExposure(payer); }
  async getMaxPayerExposure(): Promise<bigint> { return this.contract.getMaxPayerExposure(); }
}
