export default function Admin({user}:{user:any}){
  return (
    <div className="card">
      <h2>Admin</h2>
      <div className="muted">Connecté : {user?.login}</div>
      <div>À implémenter : gestion salariés, campings, affaires, exports.</div>
    </div>
  );
}