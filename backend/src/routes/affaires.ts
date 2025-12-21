import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../auth.js';
const prisma = new PrismaClient();
const router = Router();

router.get('/', requireAuth(), async (req,res)=>{
  const {campingId} = req.query;
  const where:any = {actif:true};
  if(campingId) where.campingId = Number(campingId);
  const data = await prisma.affaire.findMany({ where, orderBy:{nom:'asc'}});
  res.json(data);
});

router.post('/', requireAuth('admin'), async (req,res)=>{
  const {nom, campingId, actif=true} = req.body;
  const a = await prisma.affaire.create({data:{nom, campingId, actif}});
  res.json(a);
});

export default router;