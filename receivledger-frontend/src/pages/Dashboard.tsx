import type { ReactNode } from 'react';
import type { State } from '../types';
import { MAX_FUND, MAX_PCT } from '../constants';
import { money } from '../format';
import { exposure, maxExp } from '../ledger/demoLedger';
import { Activity, Payers } from '../components/charts';
import { Recent } from '../components/ui';

export function Dashboard({s}:{s:State}){const out=s.total-s.avail,fin=s.invoices.filter(i=>i.status===2||i.status===4).length;
 const K=({l,v,hl,n}:{l:string;v:ReactNode;hl?:boolean;n?:string})=><div className={'card kpi'+(hl?' hl':'')}><span>{l}</span><b>{v}</b><span>{n}</span></div>;
 return <><div className="grid k4"><K hl l="Total pool capital" v={money(s.total)} n={`Cap ${money(MAX_FUND)}`}/><K l="Available funds" v={money(s.avail)} n={s.total?(s.avail/s.total*100).toFixed(1)+'% of pool':'—'}/><K l="Outstanding financing" v={money(out)} n={s.total?(out/s.total*100).toFixed(1)+'% deployed':'—'}/><K l="Invoices financed" v={fin} n={`${s.invoices.length} submitted in total`}/></div>
 <div className="grid c2" style={{margin:'16px 0'}}><div className="card"><h3>Fund activity</h3><Activity log={s.log}/><span className="sub">Teal: outstanding financing · Navy: available funds. Hover a point for details.</span></div>
 <div className="card"><h3>Exposure by payer (limit {money(maxExp(s))} each)</h3><Payers s={s}/><span className="sub">Limit = {MAX_PCT}% of total fund size, as in getMaxPayerExposure().</span></div></div>
 <div className="card"><h3>Recent transactions</h3><Recent s={s}/></div></>}
