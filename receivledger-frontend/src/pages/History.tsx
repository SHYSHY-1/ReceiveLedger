import { useState } from 'react';
import type { State } from '../types';
import { dtm, money } from '../format';
import { Bd, Table } from '../components/ui';

export function History({s}:{s:State}){const [ty,setTy]=useState('All'),[st,setSt]=useState('All');const types=['All',...new Set(s.log.map(l=>l.type))];
 const rows=s.log.filter(l=>(ty==='All'||l.type===ty)&&(st==='All'||l.status===st));
 return <div className="card"><div className="f" style={{justifyContent:'space-between',marginBottom:10}}><h3 style={{margin:0}}>All activity</h3><div className="f"><select value={ty} onChange={e=>setTy(e.target.value)}>{types.map(x=><option key={x}>{x}</option>)}</select><select value={st} onChange={e=>setSt(e.target.value)}>{['All','Success','Reverted'].map(x=><option key={x}>{x}</option>)}</select></div></div>
 <Table head={['Timestamp','Event','Details','Amount','Status','Tx hash']} rows={rows.map(l=>[dtm(l.ts),<b>{l.type}</b>,l.detail,l.amount?money(l.amount):'—',<Bd t={l.status}/>,<span className="mono" title="Simulated – not a real transaction">{l.tx} (sim)</span>])} empty="No activity matches."/>
 <p className="sub" style={{marginBottom:0}}>Event names match the contract's events. Hashes are placeholders; on Sepolia they become real transaction hashes and link to Etherscan.</p></div>}
