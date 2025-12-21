import { useEffect, useState } from 'react';
import { getHistorique } from '../api';

export default function History(){
  const [rows,setRows] = useState<any[]>([]);
  useEffect(()=>{ getHistorique().then(setRows); },[]);
  if(!rows.length) return <div className="muted">Aucun historique.</div>;
  return (
    <div id="historyContent" style={{paddingTop:20}}>
      <div className="h-scrollbar"><div className="h-scrollbar-inner" /></div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th><th>Type</th><th>Lignes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id}>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
                <td>{r.typePersonne}</td>
                <td>{r.lignes.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{height:200}} />
      </div>
    </div>
  );
}