import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../auth.js';
const prisma = new PrismaClient();
const router = Router();

// Création d'un pointage (payload similaire à ton front actuel)
router.post('/', requireAuth(), async (req,res)=>{
  const user = (req as any).user;
  const { typePersonne, entries } = req.body;
  if(!typePersonne || !entries || !Array.isArray(entries) || entries.length===0){
    return res.status(400).json({error:'payload invalide'});
  }
  const pointage = await prisma.pointage.create({
    data:{
      userId:user.sub,
      typePersonne,
      lignes:{
        create: entries.map((e:any)=>({
          typeLigne: e.type,
          campingId: e.campingId ?? null,
          affaireId: e.affaireId ?? null,
          tache: e.commentaire ?? e.tache ?? '',
          heureDebut: e.heureDebut ?? '',
          heurePause: e.heurePause ?? '',
          heureReprise: e.heureReprise ?? '',
          heureFin: e.heureFin ?? '',
          commentaire: e.commentaire ?? '',
          dtype: e.dtype ?? null,
        }))
      }
    }
  });
  res.json({ok:true, id:pointage.id});
});

// Historique simple
router.get('/historique', requireAuth(), async (req,res)=>{
  const user = (req as any).user;
  const isAdmin = user.role === 'admin';
  const where:any = {};
  if(!isAdmin) where.userId = user.sub;
  const data = await prisma.pointage.findMany({
    where,
    orderBy:{createdAt:'desc'},
    include:{ lignes:true, user:true }
  });
  res.json(data);
});

export default router;