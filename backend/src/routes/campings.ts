import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../auth.js';
const prisma = new PrismaClient();
const router = Router();

router.get('/', requireAuth(), async (_req,res)=>{
  const data = await prisma.camping.findMany({ where:{actif:true}, orderBy:{nom:'asc'}});
  res.json(data);
});

// Admin CRUD (exemple create)
router.post('/', requireAuth('admin'), async (req,res)=>{
  const {nom, actif=true} = req.body;
  const c = await prisma.camping.create({data:{nom, actif}});
  res.json(c);
});

export default router;