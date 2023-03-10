import { PrismaClient } from "../../models/client";

const users = [
  {
    username: 'admin',
    fullName: 'Administrator',
    roles: [{ code: 'admin' }]
  },
  {
    username: 'viewer',
    fullName: 'User Viewer',
    roles: [{ code: 'viewer' }]
  }
];

export async function insertUsers(prisma: PrismaClient) {
  const user = await prisma.user.findFirst({ where: { username: users[0].username } })

  if (!user) {
    console.log('Insert Users')

    await prisma.$transaction(
      users.map((u) =>
        prisma.user.create({
          data: {
            username: u.username,
            passwordHash: null,
            fullName: u.fullName
          }
        })
      )
    )

    const userGroups = users.flatMap((u) =>
      u.roles.map((ug) => {
        return { username: u.username, groupCode: ug.code }
      })
    )
    await prisma.$transaction(
      userGroups.map((u) =>
        prisma.user.update({
          where: { username: u.username },
          data: {
            roles: {
              connect: {
                code: u.groupCode
              }
            }
          }
        })
      )
    )
  }
}

