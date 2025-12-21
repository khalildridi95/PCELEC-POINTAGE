import PointageForm from '../components/PointageForm';
export default function Pointage({user}:{user:any}){
  return (
    <div className="card">
      <h2>Pointage</h2>
      <div className="muted">Utilisateur connecté : <b>{user?.login}</b><br/>{user?.matricule && <span>{user.matricule}</span>}</div>
      <PointageForm />
    </div>
  );
}