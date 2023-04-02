import { useEffect, useState } from 'react'
import { useResize } from '../../hooks/useResize'
import { ReactComponent as ArrowDownSVG } from '../../assets/icons/arrowParamsDown.svg'
import { ReactComponent as ArrowUpSVG } from '../../assets/icons/arrowParamsUp.svg'
import { CostParams } from './paramsComponents/CostParams'
import { FilterParams } from './paramsComponents/filterParams'
import { ManufacturParams } from './paramsComponents/ManufacturParams'
import { ParamsListStl } from './paramsList.styled'

// Определение компонента ParamsList
export const ParamsList = () => {
  // Хук useState для отображения/скрытия списка параметров
  const [isShowParams, setIsShowParams] = useState(true)

  // Хук useResize для определения ширины экрана и реагирования на изменения размера
  const [resize800] = useResize(800)

  // Функция handleClick для переключения отображения списка параметров
  const handleClick = () => {
    if (!resize800) {
      setIsShowParams((prevIsShowParams) => !prevIsShowParams)
    }
  }

  // Хук useEffect для изменения отображения списка параметров при изменении ширины экрана
  useEffect(() => {
    if (!resize800) {
      setIsShowParams(false)
    } else {
      setIsShowParams(true)
    }
  }, [resize800])

  // Возвращаемый компонент ParamsList
  return (
    <ParamsListStl>
      {/* Заголовок списка параметров */}
      <h2 className="params__title" onClick={handleClick}>
        ПОДБОР ПО ПАРАМЕТРАМ
        <span>
          {!resize800 && (
            <>
              {/* Иконка стрелки вверх или вниз, которая меняется в зависимости от состояния isShowParams */}
              {isShowParams ? <ArrowUpSVG /> : <ArrowDownSVG />}
            </>
          )}
        </span>
      </h2>
      {/* Отображение списка параметров, если isShowParams равен true */}
      {isShowParams && (
        <div className="params__list" onMouseLeave={handleClick}>
          {/* Компоненты, отображающие параметры */}
          <CostParams />
          <ManufacturParams />
          <FilterParams />
        </div>
      )}
    </ParamsListStl>
  )
}
