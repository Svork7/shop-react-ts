import React from 'react'
import { useNavigate } from 'react-router-dom'

import { CardType } from '../cardCatalog/CardCatalog'
import { Counter } from '../counter/Counter'
import { Button } from '../../ui/Button'
import { deleteProduct } from '../../store/reducers/cartSlice'
import { useAppDispatch } from '../../store/hooks'

import { ReactComponent as DeleteSVG } from '../../assets/icons/delete.svg'
import { ReactComponent as VolumeMlSVG } from '../../assets/icons/volumeML.svg'
import { ReactComponent as VolumeGSVG } from '../../assets/icons/volumeG.svg'

import { CardStl } from './card.styled'
export const CardCart = ({ product, count }: CardType) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    dispatch(deleteProduct({ id: product.id! }))
  }

  return (
    <CardStl>
      <div className="card__top">
        <div className="card__img">
          <img src={product.url} alt={product.title} />
        </div>
        <div className="card__content">
          <span className="card__volume">
            {product.sizeType === 'Вес' ? <VolumeGSVG /> : <VolumeMlSVG />}
            {product.size}
          </span>
          <h2
            className="card__title"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {product.title}
          </h2>
          <p className="card__descr">{product.description}</p>
        </div>
      </div>
      <div className="card__bottom">
        <Counter count={count!} id={product.id!} />
        <div className="card__amount">{product.price! * count!} ₸</div>
        <Button text="" padding="20px" radius="100%" handleClick={handleClick}>
          <DeleteSVG />
        </Button>
      </div>
    </CardStl>
  )
}
