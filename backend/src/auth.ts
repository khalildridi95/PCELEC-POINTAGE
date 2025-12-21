import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export function signUser(user:{id:number; role:string; login:string}){
  return jwt.sign({ sub:user.id, role:user.role, login:user.login }, JWT_SECRET, { expiresIn:'7d' });
}
export function verifyToken(token:string){
  return jwt.verify(token, JWT_SECRET) as any;
}

export function requireAuth(role?:'admin'|'salarie'){
  return (req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies?.token;
    if(!token) return res.status(401).json({error:'unauthorized'});
    try{
      const payload = verifyToken(token);
      (req as any).user = payload;
      if(role && payload.role !== role) return res.status(403).json({error:'forbidden'});
      next();
    }catch(err){
      return res.status(401).json({error:'invalid token'});
    }
  };
}