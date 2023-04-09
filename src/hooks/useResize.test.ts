import { renderHook } from '@testing-library/react'
import { useResize } from './useResize'
import { useMediaQuery } from 'react-responsive'

jest.mock('react-responsive')

describe('useResize', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('хук не применяется если размер меньше указанного', () => {
    ;(useMediaQuery as jest.Mock).mockReturnValue(false)
    const { result } = renderHook(() => useResize(100))
    expect(result.current[0]).toBe(false)
  })

  it('хук применяется при значении равзном или большем чем указанный размер', () => {
    ;(useMediaQuery as jest.Mock).mockReturnValue(true)
    const { result } = renderHook(() => useResize(100))
    expect(result.current[0]).toBe(true)
  })

  it('состояние не меняется если не меняется размер окна', () => {
    let queryResult = false
    ;(useMediaQuery as jest.Mock).mockImplementation(() => queryResult)

    const { result } = renderHook(() => useResize(100))
    expect(result.current[0]).toBe(false)
  })

  it('состояние меняется при изменении размера ркна', () => {
    let queryResult = true
    ;(useMediaQuery as jest.Mock).mockImplementation(() => queryResult)
    const { result } = renderHook(() => useResize(100))
    expect(result.current[0]).toBe(true)
  })
})
