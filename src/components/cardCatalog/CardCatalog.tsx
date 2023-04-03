import { useNavigate } from 'react-router-dom'

import { addProduct } from '../../store/reducers/cartSlice'
import { ProductType } from '../../store/reducers/productsSlice'
import { useAppDispatch } from '../../store/hooks'

import { Button } from '../../ui/Button'

import { CardStl } from './card.styled'

import { ReactComponent as CartSVG } from '../../assets/icons/buttonCart.svg'
import { ReactComponent as VolumeGSVG } from '../../assets/icons/volumeG.svg'
import { ReactComponent as VolumeMlSVG } from '../../assets/icons/volumeML.svg'

export type CardType = {
  product: ProductType
  count?: number
}

export const CardCatalog = ({ product }: CardType) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(addProduct({ product }))
  }

  return (
    <CardStl>
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
        <span className="card__specifications">
          <span>Штрихкод: </span>
          {product.barcode}
        </span>
        <span className="card__specifications">
          <span>Производитель: </span>
          {product.manufactur}
        </span>
        <span className="card__specifications">
          <span>Бренд: </span>
          {product.brand}
        </span>
        <span className="card__specifications">
          <div className="card__care">
            <span>Тип ухода: </span>
            <div>
              {product.type_care?.map((type) => (
                <p key={type}>{type}</p>
              ))}
            </div>
          </div>
        </span>
      </div>
      <div className="card__bottom">
        <span className="card__amount">{product.price} ₸</span>
        <Button
          text="в корзину"
          padding="16px 25px"
          size="10px"
          handleClick={handleClick}
        >
          <CartSVG />
        </Button>
      </div>
    </CardStl>
  )
}
