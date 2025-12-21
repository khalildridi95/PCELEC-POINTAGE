import { useState } from 'react';
import { login } from '../api';

export default function Login({onLogin}:{onLogin:(u:any)=>void}){
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async ()=>{
    try{
      const u = await login(identifiant, password);
      onLogin(u);
    }catch(e:any){
      setErr('Identifiants invalides');
    }
  };

  return (
    <div className="card">
      <h2>Connexion</h2>
      <label>Identifiant
        <input value={identifiant} onChange={e=>setIdentifiant(e.target.value)} />
      </label>
      <label>Mot de passe
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      </label>
      {err && <div className="error-text" style={{display:'block'}}>{err}</div>}
      <div className="actions">
        <button className="small" onClick={submit}>Se connecter</button>
      </div>
    </div>
  );
}