import { PrismaClient } from "../../../models/client";

export type BaseCodeGroup = 'dummy'

export async function insertStateTransitionGroups(prisma: PrismaClient) {
  const arr: { code: BaseCodeGroup; description: string }[] = [
    {
      code: 'dummy',
      description: 'Objeto de ejemplo'
    }
  ]
  const obj = await prisma.stateTransitionGroup.findFirst({ where: { code: arr[0].code } })

  if (!obj) {
    console.log('Insert base code transition groups')

    await prisma.$transaction(
      arr.map((u) =>
        prisma.stateTransitionGroup.create({
          data: {
            code: u.code,
            description: u.description
          }
        })
      )
    )
  }
}