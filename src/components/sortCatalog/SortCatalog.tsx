import { useState } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { changeSortType } from '../../store/reducers/filtersSlice'
import { ReactComponent as DropDownSVG } from '../../assets/icons/arrowDropdown.svg'
import { SortCatalogStl } from './sortCatalog.styled'

export const sortVariant = [
  { id: 1, title: 'По названию (Я-А)' },
  { id: 2, title: 'По названию (А-Я)' },
  { id: 3, title: 'По убыванию цены' },
  { id: 4, title: 'По возрастанию цены' },
]

type SortVariantType = typeof sortVariant[0]

export const SortCatalog = () => {
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [sortType, setSortType] = useState(sortVariant[1])
  const dispatch = useAppDispatch()

  const handleClick = (item: SortVariantType) => {
    dispatch(changeSortType({ sortType: item.id }))
    setSortType(item)
    setIsSortOpen(false)
  }

  return (
    <SortCatalogStl>
      <span>Сортировка: </span>
      <span className="sort__menu" onClick={() => setIsSortOpen(!isSortOpen)}>
        {sortType.title}
        <span style={isSortOpen ? { transform: 'rotate(180deg)' } : {}}>
          <DropDownSVG />
        </span>
      </span>
      {isSortOpen && (
        <div
          className="sort__dropdown"
          onMouseLeave={() => setIsSortOpen(false)}
        >
          {sortVariant.map((item) => {
            return (
              <span key={item.id} onClick={() => handleClick(item)}>
                {item.title}
              </span>
            )
          })}
        </div>
      )}
    </SortCatalogStl>
  )
}
