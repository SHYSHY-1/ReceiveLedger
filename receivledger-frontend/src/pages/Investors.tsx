import { useState } from 'react';
import type { RunFn, State } from '../types';
import { MAX_FUND } from '../constants';
import { money, sh } from '../format';
import { demoLedger } from '../ledger/demoLedger';
import { INV0 } from '../demo/demoData';
import { Bd, Table } from '../components/ui';

export function Investors({s,run}:{s:State;run:RunFn}){const [a,setA]=useState(''),[t,setT]=useState(INV0[0][1]),[n,setN]=useState(''),[fr,setFr]=useState(INV0[0][1]),[to,setTo]=useState(INV0[1][1]),[tn,setTn]=useState('');
 const list=Object.entries(s.inv),opts=list.map(([k,v])=><option key={k} value={k}>{v.name} ({sh(k)})</option>);
 return <><div className="grid k4"><div className="card kpi hl"><span>Fund units issued (RLU)</span><b>{s.total.toLocaleString()}</b><span>1 RLU = S$1 · 0 decimals</span></div><div className="card kpi"><span>Remaining issuance capacity</span><b>{money(MAX_FUND-s.total)}</b><div className="bar" style={{marginTop:8}}><i style={{width:s.total/MAX_FUND*100+'%'}}/></div></div></div>
 <div className="card" style={{margin:'16px 0'}}><h3>Investors</h3><Table head={['Investor','Wallet','Status','RLU balance','Share of fund','']} rows={list.map(([k,v])=>[<b>{v.name}</b>,<span className="mono">{k}</span>,<Bd t={v.ok?'Approved':'Revoked'}/>,v.bal.toLocaleString(),s.total?(v.bal/s.total*100).toFixed(1)+'%':'—',v.ok?<button className="btn s d" onClick={()=>run(c=>{demoLedger.revokeInvestor(c,k);return 'Investor revoked'})}>Revoke</button>:<button className="btn s" onClick={()=>run(c=>{demoLedger.approveInvestor(c,k);return 'Investor approved'})}>Approve</button>])}/>
 <p className="sub" style={{marginBottom:0}}>Revoked wallets keep their balance but cannot send or receive units. Wallet names are demo labels; the contract stores only addresses.</p></div>
 <div className="grid c2"><div className="card"><h3>Approve an investor wallet</h3><div className="f"><label>Wallet address<input style={{width:300}} value={a} onChange={e=>setA(e.target.value)} placeholder="0x…"/></label><button className="btn" onClick={()=>run(c=>{demoLedger.approveInvestor(c,a);setA('');return 'Investor approved'})}>Approve</button></div></div>
 <div className="card"><h3>Issue fund units</h3><div className="f"><label>Investor<select value={t} onChange={e=>setT(e.target.value)}>{opts}</select></label><label>Units (RLU)<input type="number" value={n} onChange={e=>setN(e.target.value)}/></label><button className="btn" onClick={()=>run(c=>{demoLedger.issueFundUnits(c,t,+n);setN('');return n+' RLU issued'})}>Issue units</button></div></div>
 <div className="card" style={{gridColumn:'1/-1'}}><h3>Transfer units between investors <span className="sub">(ERC-20 transfer, approved wallets only)</span></h3><div className="f"><label>From<select value={fr} onChange={e=>setFr(e.target.value)}>{opts}</select></label><label>To<select value={to} onChange={e=>setTo(e.target.value)}>{opts}</select></label><label>Units<input type="number" value={tn} onChange={e=>setTn(e.target.value)}/></label><button className="btn" onClick={()=>run(c=>{demoLedger.transfer(c,fr,to,+tn);setTn('');return 'Units transferred'})}>Transfer</button></div>
 <p className="sub" style={{marginBottom:0}}>Try Kestrel Partners (not approved) as the receiver to see the contract rule reject the transfer.</p></div></div></>}
