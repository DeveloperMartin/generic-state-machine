import { PrismaClient } from "../../../models/client"

export type DummyObjectState =
  | 'no-state'
  | 'created'
  | 'in-progress'
  | 'finished'

type DummyObject = {
  code: DummyObjectState
  name: string
  iconName: string
  iconColor: string
}

export async function insertStates(prisma: PrismaClient) {
  /* eslint-disable */
  const arr: DummyObject[] = [
    { code: 'no-state', name: 'Sin estado', iconName: 'fa fa-question-circle fa-2x', iconColor: 'color: red;' },
    { code: 'created', name: 'Creado', iconName: 'fa fa-check-circle fa-2x', iconColor: 'color: green;' },
    { code: 'in-progress', name: 'En progreso', iconName: 'fa fa-spinner fa-2x', iconColor: 'color: orange;' },
    { code: 'finished', name: 'Finalizado', iconName: 'fa fa-check-circle fa-2x', iconColor: 'color: green;' },
  ]
  /* eslint-enable */

  const obj = await prisma.state.findFirst({ where: { code: arr[0].code } })

  if (!obj) {
    console.log('Insert states')

    await prisma.$transaction(
      arr.map((u) =>
        prisma.state.create({
          data: {
            code: u.code,
            name: u.name,
            iconName: u.iconName,
            iconColor: u.iconColor
          }
        })
      )
    )
  }
}