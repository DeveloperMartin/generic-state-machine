import { Prisma, PrismaClient } from "../../../models/client"
import { DummyObjectEvent } from "./events"
import { DummyObjectState } from "./states"
import { BaseCodeGroup } from "./transitionGroups"

export async function insertStateTransitions(prisma: PrismaClient) {
  /* eslint-disable */
  const transitions: {
    group: BaseCodeGroup
    role: string[]
    from: DummyObjectState
    event: DummyObjectEvent
    to: DummyObjectState
  }[] = [
    { group: 'dummy', role: ['admin'], from: 'no-state', event: 'create-dummy-object', to: 'created' },
    { group: 'dummy', role: ['admin'], from: 'created',  event: 'update-dummy-object', to: 'in-progress' },
    { group: 'dummy', role: ['admin'], from: 'in-progress',  event: 'update-dummy-object', to: 'finished' },
  ]
  const obj = await prisma.stateTransition.count()
  if (obj > 0) {
    return
  }

  console.log('Insert StatesTransitions')

  await prisma.$transaction(
    transitions.map((u) =>
      prisma.stateTransition.create({
        data: {
          group: {
            connect: { code: u.group }
          },
          from: {
            connect: { code: u.from }
          },
          event: {
            connect: { code: u.event }
          },
          to: {
            connect: { code: u.to }
          },
          roles: {
            connect: u.role.map((r) => <Prisma.RoleWhereUniqueInput>{ code: r })
          }
        }
      })
    )
  )
}
