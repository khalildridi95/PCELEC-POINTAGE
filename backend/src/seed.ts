import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main(){
  const adminPass = await bcrypt.hash('admin123', 10);
  const salPass   = await bcrypt.hash('sal123', 10);

  await prisma.user.upsert({
    where:{login:'admin'},
    update:{},
    create:{login:'admin', passwordHash:adminPass, role:'admin', matricule:'ADM001'}
  });
  await prisma.user.upsert({
    where:{login:'sal1'},
    update:{},
    create:{login:'sal1', passwordHash:salPass, role:'salarie', matricule:'SAL001'}
  });

  const c1 = await prisma.camping.upsert({where:{id:1}, update:{}, create:{nom:'Camping A', actif:true}});
  await prisma.affaire.upsert({where:{id:1}, update:{}, create:{nom:'Affaire A1', campingId:c1.id, actif:true}});
}
main().finally(()=>prisma.$disconnect());