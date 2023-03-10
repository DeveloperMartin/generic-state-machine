import { CreateDummyObjectDto, UpdateDummyObjectDto } from "../../dtos/dummy-object/dummyObject.dto";
import prisma from "../../models/client";
import { DummyObjectState, nameT } from "../../seed/seeders/stateMachine/states";

class DummyObjectService {



  async getDummyObjectList(page: number = 0, perPage: number = 10) {

    const skip = perPage * (page - 1)

    const dummyObject = await prisma.dummyObject.findMany({
      skip: skip,
      take: perPage,
      select: {
        name: true,
        state: {
          select: {
            code: true,
            name: true,
            iconColor: true,
            iconName: true
          }
        }
      },
    })
    return dummyObject;
  }

  async getDummyObject(dummyObjectId: number) {
    const dummyObject = await prisma.dummyObject.findUnique({
      where: {
        dummyObjectId: dummyObjectId
      },
      select: {
        name: true,
        state: {
          select: {
            code: true,
            name: true,
            iconColor: true,
            iconName: true
          }
        }
      },
    })
    return dummyObject;
  }

  async createDummyObject(body: CreateDummyObjectDto) {
    const dummyObject = await prisma.dummyObject.create({
      data: {
        name: body.name,
        state: {
          connect: {
            code: nameT<DummyObjectState>('no-state')
          }
        }
      }
    })
    return dummyObject;
  }


  async updateDummyObject(dummyObjectId:number, {name}: UpdateDummyObjectDto) {
    const dummyObject = await prisma.dummyObject.update({
      where: {
        dummyObjectId: dummyObjectId
      },
      data: {
        name: name
      }
    })
    return dummyObject;
  }
}

export const dummyObjectService = new DummyObjectService();