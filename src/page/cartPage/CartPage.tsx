import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CardCart } from '../../components/cardCart/CardCart'
import { BreadCrumbs } from '../../components/breadCrumbs/BreadCrumbs'
import { ThanksForOrder } from '../modal/ThanksForOrder'
import { Modal } from '../../helperComponentsStyled/Modal'
import Container from '../../helperComponentsStyled/Container'
import { CartPageStl } from './cartPage.styled'
import { Button } from '../../ui/Button'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useResize } from '../../hooks/useResize'

import { clearCart } from '../../store/reducers/cartSlice'
import { calculateAmount } from '../../helpers/calculateAmount'

export const CartPage = () => {
  // С помощью хука useResize проверяем ширину окна браузера и сохраняем результат в переменной isMobileView.
  const [isMobileView] = useResize(600)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showPopUp, setShowPopUp] = useState(false)
  const productsInCart = useAppSelector((state) => state.cart.products)
  // Вычисляем общую сумму товаров в корзине с помощью функции calculateAmount.
  const total = calculateAmount(productsInCart)

  //Обработчик клика по кнопке очистки корзины. Отправляем действие очистки корзины в хранилище Redux и отображаем всплывающее окно.
  const handleClearCart = () => {
    dispatch(clearCart())
    setShowPopUp(true)
  }

  return (
    <CartPageStl>
      {/* //Если ширина окна браузера меньше 600 пикселей, то отображаем компонент BreadCrumbs.*/}
      {isMobileView && <BreadCrumbs />}
      <Container>
        <div className="cart__wrapper">
          {!isMobileView && (
            <div className="cart__back">
              <Button
                text="<"
                handleClick={() => navigate('/catalog')}
                padding="8px 12px"
                bgColor="var(--yellow-gradient)"
                color="var(--black)"
                self="flex-start"
              />
              назад
            </div>
          )}
          <h1 className="cart__title">Корзина</h1>
          {total === 0 && (
            <div>
              <h2 className="cart__title">Ваша корзина пуста</h2>
            </div>
          )}
          <div className="cart__list">
            {productsInCart.map((product) => (
              <CardCart
                key={product.product.id}
                product={product.product}
                count={product.count}
              />
            ))}
          </div>
          <div className="cart__arrange">
            <Button
              text="Оформить заказ"
              handleClick={handleClearCart}
              disabled={productsInCart.length === 0}
            />
            <span className="cart__amount">{total} ₸</span>
          </div>
        </div>
      </Container>
      {showPopUp && (
        <Modal toggle={setShowPopUp}>
          <ThanksForOrder />
        </Modal>
      )}
    </CartPageStl>
  )
}
