
import { State, StateEvent, StateTransition } from "../../models/client";
import { BaseCodeGroup } from '../../seed/seeders/stateMachine/transitionGroups';
import { DummyObjectEvent } from '../../seed/seeders/stateMachine/events';


// State
export type StateDto = {
  stateId: number
  code: string
  name: string
  iconName: string | null
  iconColor: string | null
  isActive: boolean
}

export type StateUpdateDto = {
  group: BaseCodeGroup
  event: DummyObjectEvent
}

export type StateTransitionDto = {
  state: string
  stateTooltip: string
  stateIconName: string | null
  stateIconColor: string | null
  event: {
    code: string
    tooltip: string
    roles: {
      code: string
    }[]
  }[]
}

export type StateTransitionListDto = { [key: string]: StateTransitionDto }

export function buildStateTransitionListDto(
  args: (StateTransition & {
    from: State
    event: StateEvent
    roles: {
      code: string
    }[]
  })[],
  states: State[]
): StateTransitionListDto {
  const result: { [key: string]: StateTransitionDto } = {}
  // all states to dictionaty
  states.forEach((e) => {
    result[e.code] = {
      state: e.code,
      stateTooltip: e.name,
      stateIconName: e.iconName,
      stateIconColor: e.iconColor,
      event: []
    }
  })

  // all events to dictionaty
  args.forEach((e) => {
    if (!result[e.from.code]) {
      result[e.from.code] = {
        state: e.from.code,
        stateTooltip: e.from.name,
        stateIconName: e.from.iconName,
        stateIconColor: e.from.iconColor,
        event: []
      }
    }
    result[e.from.code].event.push({
      code: e.event.code,
      tooltip: e.event.description,
      roles: e.roles
    })
  })
  return result
}
