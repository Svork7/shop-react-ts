import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addTypeCare, removeTypeCare } from '../../store/reducers/filtersSlice'
import styled from 'styled-components'

type FilterStlType = {
  isActive: boolean
}

//  стили для компонента
const FilterStl = styled.div<FilterStlType>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 18px;
  background: ${(props) =>
    props.isActive ? 'var(--yellow-gradient)' : 'var(--white)'};
  box-shadow: var(--shadow);
  border-radius: 10px;
  cursor: pointer;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: var(--dark);
  }

  @media (max-width: 600px) {
    padding: 2px 8px;
    box-shadow: none;
    flex-direction: row;
    gap: 2px;
    justify-content: flex-start;
    max-width: fit-content;
  }
`

// типы пропсов
type FilterType = {
  text: string
  typeCare: string
}

export const Filter = (props: FilterType) => {
  // получаем значение фильтра из стора
  const [typeCare] = useAppSelector((state) =>
    state.filters.typeCare.filter((typeCare) => typeCare === props.typeCare)
  )
  // Определяем состояние
  const [isActive, toggleIsActive] = useState(!!typeCare)
  const dispatch = useAppDispatch()
  // Обработчик клика, убираем из стора если активен и добавляем если нет
  const handleClick = () => {
    if (!isActive) {
      dispatch(addTypeCare({ typeCare: props.typeCare }))
    } else {
      dispatch(removeTypeCare({ typeCare: props.typeCare }))
    }
    toggleIsActive((prev) => !prev)
  }

  useEffect(() => {
    toggleIsActive(!!typeCare)
  }, [typeCare])

  return (
    <FilterStl isActive={isActive} onClick={handleClick}>
      <span>Тип ухода</span>
      <span>{props.text}</span>
    </FilterStl>
  )
}
