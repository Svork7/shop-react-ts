import {
  setFilterManufacture,
  setMinCost,
  setMaxCost,
  addTypeCare,
  removeTypeCare,
  changeSortType,
  FiltersType,
  filtersSlice,
} from './filtersSlice'
import { PayloadAction } from '@reduxjs/toolkit'

describe('filtersSlice', () => {
  let initialState: FiltersType

  beforeEach(() => {
    initialState = {
      manufactur: [],
      typeCare: [],
      minCost: 0,
      maxCost: 10000,
      sortType: 0,
    }
  })

  it('при первом запуске устанавливается начальное состояние фильтров', () => {
    const nextState = filtersSlice.reducer(undefined, {} as PayloadAction<any>)
    expect(nextState).toEqual(initialState)
  })

  it('проверка обновления фильтра по производителю', () => {
    const newManufacturFilter = ['Brand 1', 'Brand 2']
    const nextState = filtersSlice.reducer(
      initialState,
      setFilterManufacture(newManufacturFilter)
    )
    expect(nextState.manufactur).toEqual(newManufacturFilter)
  })

  it('проверка обновления фильтра по минимальной цене', () => {
    const newMinCost = 500
    const nextState = filtersSlice.reducer(
      initialState,
      setMinCost({ minCost: newMinCost })
    )
    expect(nextState.minCost).toEqual(newMinCost)
  })

  it('проверка обновления фильтра по максимальной цене', () => {
    const newMaxCost = 2000
    const nextState = filtersSlice.reducer(
      initialState,
      setMaxCost({ maxCost: newMaxCost })
    )
    expect(nextState.maxCost).toEqual(newMaxCost)
  })

  it('проверка фильтра при добавлении типа ухода', () => {
    const newTypeCare = 'Type 1'
    const nextState = filtersSlice.reducer(
      initialState,
      addTypeCare({ typeCare: newTypeCare })
    )
    expect(nextState.typeCare).toContain(newTypeCare)
  })

  it('проверка фильтра при удалении типа ухода', () => {
    const typeCareToRemove = 'Type 1'
    const stateWithFilter = { ...initialState, typeCare: [typeCareToRemove] }
    const nextState = filtersSlice.reducer(
      stateWithFilter,
      removeTypeCare({ typeCare: typeCareToRemove })
    )
    expect(nextState.typeCare).not.toContain(typeCareToRemove)
  })

  it('проверка изменения типа сортировки товаров', () => {
    const newSortType = 1
    const nextState = filtersSlice.reducer(
      initialState,
      changeSortType({ sortType: newSortType })
    )
    expect(nextState.sortType).toEqual(newSortType)
  })
})
