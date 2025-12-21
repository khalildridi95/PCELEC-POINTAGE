import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { signUser } from '../auth.js';
const prisma = new PrismaClient();
const router = Router();

router.post('/login', async (req,res)=>{
  const {login, password} = req.body;
  const user = await prisma.user.findUnique({where:{login}});
  if(!user || !user.active) return res.status(400).json({error:'invalid'});
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(400).json({error:'invalid'});
  const token = signUser({id:user.id, role:user.role, login:user.login});
  res.cookie('token', token, {
    httpOnly:true,
    sameSite:'lax',
    secure:false // à mettre true en prod https
  });
  res.json({role:user.role, login:user.login, matricule:user.matricule});
});

router.post('/logout', (req,res)=>{
  res.clearCookie('token');
  res.json({ok:true});
});

export default router;