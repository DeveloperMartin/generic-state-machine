import { PrismaClient } from "../../models/client";

const roles = [
  {
    code: 'admin',
    description: 'Administrator',
    // El administrador no necesita permisos, ya que tiene acceso a todo
    permissions: []
  },
  {
    code: 'viewer',
    description: 'Visualizacion',
    permissions: ['users:read', 'roles:read', 'permissions:read']
  },
  {
    code: 'editor',
    description: 'Edicion',
    permissions: ['users:read', 'users:update', 'roles:read', 'permissions:read']
  },
  {
    code: 'owner',
    description: 'Propietario',
    permissions: ['users:read', 'users:update', 'users:delete', 'roles:read', 'permissions:read']
  }
];

export async function insertRoles(prisma: PrismaClient) {
  const role = await prisma.role.findFirst({ where: { code: roles[0].code } })

  if (!role) {
    console.log('Insert Roles')
    const rolesPerms = roles.flatMap((r) =>
      r.permissions.map((p) => {
        return {
          code: r.code,
          permCode: p
        }
      })
    )

    await prisma.$transaction(
      roles.map((r) => prisma.role.create({ data: { code: r.code, description: r.description } }))
    )

    await prisma.$transaction(
      rolesPerms.map((r) =>
        prisma.role.update({
          where: {
            code: r.code
          },
          data: {
            permissions: {
              connect: {
                code: r.permCode
              }
            }
          }
        })
      )
    )
  }
}
