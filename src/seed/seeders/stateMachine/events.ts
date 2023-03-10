import { PrismaClient } from "../../../models/client";

export type DummyObjectEvent =
  | 'create-dummy-object'
  | 'update-dummy-object'
  | 'delete-dummy-object'
  | 'finish-dummy-object'



export async function insertEvents(prisma: PrismaClient) {
  const arr: { code: DummyObjectEvent; description: string }[] = [
    { code: 'create-dummy-object', description: 'Creacion del objeto' },
    { code: 'update-dummy-object', description: 'Actualizacion del objeto' },
    { code: 'delete-dummy-object', description: 'Eliminacion del objeto' },
    { code: 'finish-dummy-object', description: 'Finalización del objeto' }
  ]

  const obj = await prisma.stateEvent.findFirst({ where: { code: arr[0].code } })

  if (!obj) {
    console.log('Insert StatesEvents')

    await prisma.$transaction(
      arr.map((u) =>
        prisma.stateEvent.create({
          data: {
            code: u.code,
            description: u.description
          }
        })
      )
    )
  }
}