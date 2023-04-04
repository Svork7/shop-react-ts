import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductType } from './productsSlice'

export type ProductInCartType = {
  product: ProductType
  count: number
}

export type CartType = {
  products: Array<ProductInCartType>
  idList: Array<string>
}

const initialState: CartType = {
  products: [],
  idList: [],
}

export const productsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<{ product: ProductType; count?: number }>
    ) => {
      const productId = action.payload.product.id!
      const count = action.payload.count ?? 1
      const existingProduct = state.products.find(
        (p) => p.product.id === productId
      )

      if (existingProduct) {
        existingProduct.count += count
      } else {
        state.idList.push(productId)
        state.products.push({ product: action.payload.product, count: count })
      }
    },
    incrementProductCount: (state, action: PayloadAction<{ id: string }>) => {
      const product = state.products.find(
        (product) => product.product.id === action.payload.id
      )!
      product.count = product.count + 1
    },
    decrementProductCount: (state, action: PayloadAction<{ id: string }>) => {
      const product = state.products.find(
        (product) => product.product.id === action.payload.id
      )!
      if (product.count > 1) {
        product.count = product.count - 1
      } else {
        product.count = 1
      }
    },
    deleteProduct: (state, action: PayloadAction<{ id: string }>) => {
      const productIndex = state.products.findIndex(
        (product) => product.product.id === action.payload.id
      )
      state.products.splice(productIndex, 1)
      state.idList = state.idList.filter((item) => item !== action.payload.id)
    },
    clearCart: (state) => {
      state.products = []
      state.idList = []
    },
  },
})

export const {
  addProduct,
  clearCart,
  incrementProductCount,
  decrementProductCount,
  deleteProduct,
} = productsSlice.actions

export default productsSlice.reducer
