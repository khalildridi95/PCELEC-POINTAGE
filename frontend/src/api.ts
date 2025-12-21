const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export async function login(login:string, password:string){
  const r = await fetch(`${API}/auth/login`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    credentials:'include',
    body:JSON.stringify({login,password})
  });
  if(!r.ok) throw new Error('login failed');
  return r.json();
}
export async function me(){
  const r = await fetch(`${API}/auth/me`, { credentials:'include' });
  if(!r.ok) throw new Error('not auth');
  return r.json();
}
export async function getCampings(){
  const r = await fetch(`${API}/campings`, {credentials:'include'});
  return r.json();
}
export async function getAffaires(campingId?:number){
  const url = campingId ? `${API}/affaires?campingId=${campingId}` : `${API}/affaires`;
  const r = await fetch(url, {credentials:'include'});
  return r.json();
}
export async function postPointage(payload:any){
  const r = await fetch(`${API}/pointages`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    credentials:'include',
    body:JSON.stringify(payload)
  });
  if(!r.ok) throw new Error('save failed');
  return r.json();
}
export async function getHistorique(){
  const r = await fetch(`${API}/pointages/historique`, {credentials:'include'});
  return r.json();
}