import { PrismaClient } from '@prisma/client'
import { insertPermissions } from './seeders/permissions'
import { insertRoles } from './seeders/roles'
import { insertUsers } from './seeders/users'
import { insertStates } from './seeders/stateMachine/states'
import { insertEvents } from './seeders/stateMachine/events'
import { insertStateTransitionGroups } from './seeders/stateMachine/transitionGroups'
import { insertStateTransitions } from './seeders/stateMachine/transitions'

const prisma = new PrismaClient()

export async function seed() {
  await insertPermissions(prisma)
  await insertRoles(prisma)
  await insertUsers(prisma)
  await insertStates(prisma)
  await insertStateTransitionGroups(prisma)
  await insertEvents(prisma)
  await insertStateTransitions(prisma)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect()
  })
