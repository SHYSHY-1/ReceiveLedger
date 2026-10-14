import { useMemo, useState } from 'react';
import type { RunFn, State } from '../types';
import { D, STAT } from '../constants';
import { dt, money, sh } from '../format';
import { demoLedger, exposure, maxExp } from '../ledger/demoLedger';
import { NAMES } from '../demo/demoData';
import { Bd, Table } from '../components/ui';

export function Invoices({s,run}:{s:State;run:RunFn;role:string}){const [f,setF]=useState('All'),[q,setQ]=useState(''),[p,setP]=useState(''),[a,setA]=useState(''),[m,setM]=useState(''),[sp,setSp]=useState(''),[sa,setSa]=useState('');
 const rows=s.invoices.filter(i=>(f==='All'||STAT[i.status]===f)&&(i.payer+i.id).toLowerCase().includes(q.toLowerCase())).reverse();
 const sim=useMemo(()=>{const amt=+sa||0,cur=exposure(s,sp),mx=maxExp(s),after=cur+amt;return{cur,mx,after,ok:amt>0&&sp&&after<=mx}},[s,sp,sa]);
 return <><div className="card" style={{marginBottom:16}}><h3>Submit invoice <span className="sub">(submitInvoice – open to any wallet; submitted as {NAMES[s.caller]||sh(s.caller)})</span></h3>
 <div className="f"><label>Payer name<input value={p} onChange={e=>setP(e.target.value)} placeholder="e.g. Nova Telecom"/></label><label>Amount (S$)<input type="number" value={a} onChange={e=>setA(e.target.value)} placeholder="25000"/></label><label>Maturity date<input type="date" value={m} onChange={e=>setM(e.target.value)}/></label>
 <button className="btn" onClick={()=>run(c=>{const id=demoLedger.submitInvoice(c,p,+a,m?new Date(m+'T12:00').getTime():0);setP('');setA('');setM('');return 'Invoice #'+id+' submitted'})}>Submit invoice</button></div></div>
 <div className="grid c2"><div className="card" style={{gridColumn:'1/-1'}}><div className="f" style={{justifyContent:'space-between',marginBottom:10}}><h3 style={{margin:0}}>All invoices</h3><div className="f"><input placeholder="Search payer or #" value={q} onChange={e=>setQ(e.target.value)}/><select value={f} onChange={e=>setF(e.target.value)}>{['All',...STAT].map(x=><option key={x}>{x}</option>)}</select></div></div>
 <Table head={['#','SME wallet','Payer','Amount','Matures','Status','Reason / action']} empty="No invoices match." rows={rows.map(i=>[i.id,NAMES[i.sme]||sh(i.sme),i.payer,money(i.amount),dt(i.mat),<Bd t={STAT[i.status]}/>,
  i.status===0?<button className="btn s" onClick={()=>run(c=>{demoLedger.approveInvoice(c,i.id);return 'Invoice #'+i.id+' approved'})}>Approve</button>:
  i.status===1?<button className="btn s" onClick={()=>run(c=>{const r=demoLedger.financeInvoice(c,i.id);return r?'Financing rejected: '+r:'Invoice #'+i.id+' financed'},)}>Finance</button>:
  i.status===2?<button className="btn s o" onClick={()=>run(c=>{demoLedger.recordRepayment(c,i.id);return 'Repayment recorded for #'+i.id})}>Record repayment</button>:
  i.status===3?<span style={{color:'#b91c1c',fontWeight:600}}>{i.reason}</span>:<span className="sub">Principal returned</span>])}/>
 <p className="sub" style={{marginBottom:0}}>The contract has no manual “reject” function: an approved invoice becomes Rejected automatically when financeInvoice() fails a check (matured, over 90 days, insufficient funds, or payer limit).</p></div>
 <div className="card"><h3>10% payer exposure check</h3><div className="f"><label>Payer<input list="pl" value={sp} onChange={e=>setSp(e.target.value)} placeholder="Choose or type"/></label><datalist id="pl">{[...new Set(s.invoices.map(i=>i.payer))].map(x=><option key={x} value={x}/>)}</datalist><label>Financing amount (S$)<input type="number" value={sa} onChange={e=>setSa(e.target.value)}/></label></div>
 {sp&&<><p>Outstanding to {sp}: <b>{money(sim.cur)}</b> · Limit: <b>{money(sim.mx)}</b> · After financing: <b>{money(sim.after)}</b> ({s.total?(sim.after/s.total*100).toFixed(1):0}%)</p><div className="bar"><i style={{width:Math.min(sim.after/(sim.mx||1)*100,100)+'%',background:sim.ok?undefined:'#dc2626'}}/></div>
 {+sa>0&&<div className="res" style={{background:sim.ok?'#dcfce7':'#fee2e2',color:sim.ok?'#15803d':'#b91c1c'}}>{sim.ok?'Passes the exposure check':'Would be rejected: Payer exposure limit exceeded'}</div>}</>}
 <p className="sub">Preview only. The other checks (maturity, available funds) run when you press Finance.</p></div>
 <div className="card"><h3>Demo controls <span className="bd" style={{background:'#fef3c7',color:'#92400e'}}>Simulated only</span></h3><p className="sub">Not a contract function. The chain's clock moves on its own, so this lets you show the “Invoice already matured” rejection.</p><button className="btn o" onClick={()=>run(c=>{c.now+=30*D;return 'Demo clock moved to '+dt(c.now)})}>Advance demo clock 30 days</button> <span className="sub">Now: {dt(s.now)}</span></div></div></>}
