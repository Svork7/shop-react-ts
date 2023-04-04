import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { CartType } from '../../store/reducers/cartSlice'

// селектор для подсчета количества товаров в корзине
export const selectTotalQuantity = createSelector(
  (state: RootState) => state.cart,
  (cart: CartType) =>
    cart.products.reduce((total, product) => total + product.count, 0)
)
