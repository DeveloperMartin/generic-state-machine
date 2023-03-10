import { PrismaClient } from "../../models/client";

export const permissions = [
  { code: 'users:create', description: 'Create Users' },
  { code: 'users:update', description: 'Update Users' },
  { code: 'users:read', description: 'Read Users' },
  { code: 'users:delete', description: 'Delete Users' },
];

export async function insertPermissions(prisma: PrismaClient) {
  const perm = await prisma.permission.findFirst({ where: { code: permissions[0].code } })

  if (!perm) {
    console.log('Insert Permission')
    await prisma.$transaction(permissions.map((p) => prisma.permission.create({ data: p })))
  }
}