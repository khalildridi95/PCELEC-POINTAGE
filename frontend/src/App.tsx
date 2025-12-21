import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Pointage from './pages/Pointage';
import Admin from './pages/Admin';
import { useEffect, useState } from 'react';
import { me } from './api';

export default function App(){
  const [user,setUser] = useState<any>(null);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    me().then(u=>{
      setUser(u);
      if(u?.role==='admin') navigate('/admin');
      else if(u?.role==='salarie') navigate('/pointage');
      setLoading(false);
    }).catch(()=>setLoading(false));
  },[]);

  if(loading) return <div>Chargement...</div>;

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={(u)=>{setUser(u); if(u.role==='admin') navigate('/admin'); else navigate('/pointage');}} />} />
      <Route path="/pointage" element={user ? <Pointage user={user}/> : <Navigate to="/login" />} />
      <Route path="/admin" element={user?.role==='admin' ? <Admin user={user}/> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={user ? (user.role==='admin'?'/admin':'/pointage') : '/login'} />} />
    </Routes>
  );
}