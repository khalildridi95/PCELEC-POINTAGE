import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../auth.js';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
const router = Router();

router.get('/', requireAuth('admin'), async (_req,res)=>{
  const users = await prisma.user.findMany({orderBy:{login:'asc'}});
  res.json(users);
});

router.post('/', requireAuth('admin'), async (req,res)=>{
  const {login, password, role='salarie', matricule=null, active=true} = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const u = await prisma.user.create({data:{login, passwordHash, role, matricule, active}});
  res.json(u);
});

export default router;