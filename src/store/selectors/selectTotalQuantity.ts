import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { CartType } from '../../store/reducers/cartSlice'

// Selector to compute the total quantity of products in the cart
export const selectTotalQuantity = createSelector(
  (state: RootState) => state.cart,
  (cart: CartType) =>
    cart.products.reduce((total, product) => total + product.count, 0)
)
