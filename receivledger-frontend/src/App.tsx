import { useState, type ReactNode } from 'react';
import type { State, RunFn } from './types';
import { emit } from './ledger/demoLedger';
import { seed } from './demo/seed';
import { ROLES } from './demo/demoData';
import { Dashboard } from './pages/Dashboard';
import { Invoices } from './pages/Invoices';
import { Investors } from './pages/Investors';
import { History } from './pages/History';

export default function App(){const [s,setS]=useState<State>(seed),[page,setPage]=useState('Dashboard'),[role,setRole]=useState('Fund manager'),[toast,setToast]=useState<{msg:string;ok:boolean}|null>(null);
 const run:RunFn=fn=>{const c=structuredClone(s);c.caller=ROLES[role];let msg:string|void|null;let ok=true;try{msg=fn(c)}catch(e){ok=false;msg=(e as Error).message;const c2=structuredClone(s);c2.caller=c.caller;emit(c2,'Reverted',msg,0,'Reverted');setS(c2);setToast({msg:'Reverted: '+msg,ok});setTimeout(()=>setToast(null),4000);return}
  setS(c);setToast({msg:(msg as string)||'',ok:!/rejected/i.test((msg as string)||'')});setTimeout(()=>setToast(null),4000)};
 const P:Record<string,ReactNode>={Dashboard:<Dashboard s={s}/>,'Invoice management':<Invoices s={s} run={run} role={role}/>,Investors:<Investors s={s} run={run}/>,'Transaction history':<History s={s}/>};
 const ic:Record<string,string>={Dashboard:'◫','Invoice management':'▤',Investors:'◉','Transaction history':'≋'};
 return <div className="app"><aside className="side"><div className="logo"><i>R</i>ReceivLedger</div>{Object.keys(P).map(k=><button key={k} className={'nav'+(page===k?' on':'')} onClick={()=>setPage(k)}><span>{ic[k]}</span>{k}</button>)}<small>RLU fund-unit token · Sepolia testnet target. Frontend in demo mode.</small></aside>
 <main className="main"><div className="top"><div><h1>{page}</h1><span className="sub">Receivables fund · amounts in S$</span></div><label className="f" style={{alignItems:'center'}}><span className="sub">Acting as</span><select value={role} onChange={e=>setRole(e.target.value)}>{Object.keys(ROLES).map(r=><option key={r}>{r}</option>)}</select></label></div>
 <div className="demo"><b>Demo mode.</b> All data is fictional and every action is simulated in your browser. No blockchain transaction is sent. Switch “Acting as” to a non-manager wallet to see manager-only functions revert.</div>
 {P[page]}</main>{toast&&<div className="toast" style={{background:toast.ok?'#0f766e':'#b91c1c'}}>{toast.msg}</div>}</div>}
