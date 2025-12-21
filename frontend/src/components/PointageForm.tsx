import { useEffect, useState } from 'react';
import { getCampings, getAffaires, postPointage } from '../api';
import History from './History';

export default function PointageForm(){
  const [campings,setCampings] = useState<any[]>([]);
  const [affaires,setAffaires] = useState<any[]>([]);
  const [typePersonne,setTypePersonne] = useState('');
  const [entries,setEntries] = useState<any[]>([]);
  const [msg,setMsg] = useState('');

  useEffect(()=>{ getCampings().then(setCampings); },[]);

  const addChantier = ()=>{
    setEntries(e=>[...e, {type:'chantier', campingId:'', affaireId:'', tache:'', heureDebut:'', heureFin:''}]);
  };
  const addDep = ()=>{
    setEntries(e=>[...e, {type:'deplacement', dtype:'domicile', commentaire:'', heureDebut:'', heureFin:''}]);
  };

  const submit = async ()=>{
    await postPointage({typePersonne, entries});
    setMsg('Enregistré');
    setEntries([]);
    setTimeout(()=>setMsg(''),2000);
  };

  return (
    <div>
      <label>Type
        <select value={typePersonne} onChange={e=>setTypePersonne(e.target.value)}>
          <option value="">-- Choisir --</option>
          <option value="salarie">Salarié</option>
          <option value="interimaire">Intérimaire</option>
        </select>
      </label>
      <div className="entry-actions">
        <button className="small" onClick={addChantier}>Ajouter un chantier</button>
        <button className="small" onClick={addDep}>Ajouter déplacement</button>
      </div>
      {entries.map((en,idx)=>(
        <div key={idx} className={en.type==='chantier'?'chantier-block':'deplacement-block'}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <strong>{en.type==='chantier'?'Chantier':'Déplacement'} {idx+1}</strong>
            <button className="small" onClick={()=>setEntries(entries.filter((_,i)=>i!==idx))}>Supprimer</button>
          </div>
          {en.type==='chantier' && (
            <>
              <label>Camping
                <select value={en.campingId} onChange={e=>{
                  const v = e.target.value;
                  setEntries(es=>es.map((x,i)=>i===idx?{...x,campingId:v, affaireId:''}:x));
                  getAffaires(Number(v)).then(setAffaires);
                }}>
                  <option value="">-- Choisir --</option>
                  {campings.map(c=><option key={c.id} value={c.id}>{c.nom}</option>)}
                </select>
              </label>
              <label>Affaire
                <select value={en.affaireId} onChange={e=>setEntries(es=>es.map((x,i)=>i===idx?{...x,affaireId:e.target.value}:x))}>
                  <option value="">-- Choisir --</option>
                  {affaires.map(a=><option key={a.id} value={a.id}>{a.nom}</option>)}
                </select>
              </label>
              <label>Tâche <textarea value={en.tache} onChange={e=>setEntries(es=>es.map((x,i)=>i===idx?{...x,tache:e.target.value}:x))} /></label>
              <label>Heure début <input type="time" value={en.heureDebut} onChange={e=>setEntries(es=>es.map((x,i)=>i===idx?{...x,heureDebut:e.target.value}:x))}/></label>
              <label>Heure fin <input type="time" value={en.heureFin} onChange={e=>setEntries(es=>es.map((x,i)=>i===idx?{...x,heureFin:e.target.value}:x))}/></label>
            </>
          )}
          {en.type==='deplacement' && (
            <>
              <label>Type
                <select value={en.dtype} onChange={e=>setEntries(es=>es.map((x,i)=>i===idx?{...x,dtype:e.target.value}:x))}>
                  <option value="domicile">Domicile</option>
                  <option value="travail">Travail</option>
                </select>
              </label>
              <label>Commentaire <input value={en.commentaire} onChange={e=>setEntries(es=>es.map((x,i)=>i===idx?{...x,commentaire:e.target.value}:x))}/></label>
              <label>Début <input type="time" value={en.heureDebut} onChange={e=>setEntries(es=>es.map((x,i)=>i===idx?{...x,heureDebut:e.target.value}:x))}/></label>
              <label>Fin <input type="time" value={en.heureFin} onChange={e=>setEntries(es=>es.map((x,i)=>i===idx?{...x,heureFin:e.target.value}:x))}/></label>
            </>
          )}
        </div>
      ))}
      <div className="actions" style={{marginTop:32}}>
        <button className="small" onClick={submit}>Valider</button>
        {msg && <div className="msg">{msg}</div>}
      </div>
      <History />
    </div>
  );
}