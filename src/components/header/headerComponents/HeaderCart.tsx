import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import { useSelector } from 'react-redux'
import { selectTotalQuantity } from '../../../store/selectors/selectTotalQuantity'

import { calculateAmount } from '../../../helpers/calculateAmount'
import styled from 'styled-components'
import { ReactComponent as CartSVG } from '../../../assets/icons/cart.svg'

const HeaderCartStl = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  .left {
    position: relative;
    span {
      position: absolute;
      top: 0;
      right: 0;
      width: 22px;
      height: 22px;
      border-radius: 100%;
      text-align: center;
      font-weight: 700;
      font-size: 14px;
      color: var(--white);
      background: var(--yellow);
      border: 3px solid var(--white);
      transform: translateX(50%);
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    .cart {
      font-weight: 300;
      font-size: 12px;
      line-height: 150%;
      color: var(--dark);
    }

    .amount {
      font-weight: 600;
      font-size: 14px;
      line-height: 150%;
      color: var(--black);
    }
  }
  @media (max-width: 420px) {
    .right {
      display: none;
    }
  }
`

export const HeaderCart = () => {
  const navigate = useNavigate()
  const totalQuantity = useSelector(selectTotalQuantity)
  const handleClick = () => {
    navigate('/cart')
  }

  const cart = useAppSelector((state) => state.cart)

  const total = calculateAmount(cart.products)

  return (
    <HeaderCartStl onClick={handleClick}>
      <div className="left">
        <CartSVG />
        <span>{totalQuantity}</span>
      </div>
      <div className="right">
        <span className="cart">Корзина</span>
        <span className="ammount">{total} ₸</span>
      </div>
    </HeaderCartStl>
  )
}
