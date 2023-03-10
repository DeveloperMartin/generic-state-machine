import { stateMachineService } from '../services/dummy-object/stateMachine/stateMachine.service';
import { Controller, Route, Tags, Put, Path, Get, Query, Post, Body } from 'tsoa'
import { DummyObjectEvent } from '../seed/seeders/stateMachine/events';
import { dummyObjectService } from '../services/dummy-object/dummyObject.service';
import { CreateDummyObjectDto, UpdateDummyObjectDto } from '../dtos/dummy-object/dummyObject.dto';

@Route("dummy-object")
@Tags("dummyObject")
export class DummyObjectController extends Controller {
  
  @Get('')
  public async getDummyObjectList(
    @Query() page: number = 1,
    @Query() perPage: number = 10
  ){
    return await dummyObjectService.getDummyObjectList(page, perPage)
  }

  @Get('{dummyObjectId}')
  public async getDummyObject(@Path() dummyObjectId: number){
    return await dummyObjectService.getDummyObject(dummyObjectId)
  }

  @Post('')
  public async createDummyObject(@Body() body: CreateDummyObjectDto){
    const {dummyObjectId} = await dummyObjectService.createDummyObject(body)
  
    return await stateMachineService.updateDummyObjectState(
      {
        group: 'dummy',
        event: 'create-dummy-object'
      },
      dummyObjectId
    )
  }

  @Put('{dummyObjectId}')
  public async updateDummyObject(@Path() dummyObjectId: number, @Body() body: UpdateDummyObjectDto){
    return await dummyObjectService.updateDummyObject(dummyObjectId, body)
  }

  @Put('{dummyObjectId}/state/{eventCode}')
  public async updateDummyObjectState(
    @Path() dummyObjectId: number,
    @Path() eventCode: DummyObjectEvent
    ){
    return await stateMachineService.updateDummyObjectState(
      {
        group: 'dummy',
        event: eventCode
      },
      dummyObjectId
    )
  }

}