import { createStore } from 'redux'
import productsReducer, {
  addProduct,
  clearCart,
  incrementProductCount,
  decrementProductCount,
  deleteProduct,
  ProductInCartType,
  CartType,
} from './cartSlice'

const mockProduct: ProductInCartType = {
  product: {
    id: '1',
    title: 'Test Product',
    price: 10,
    description: 'A test product',
  },
  count: 1,
}

describe('productsSlice', () => {
  let store: any
  beforeEach(() => {
    store = createStore(productsReducer)
  })

  test('добавление товара в корзину', () => {
    store.dispatch(addProduct({ product: mockProduct.product }))
    const cart: CartType = store.getState()
    expect(cart.products).toHaveLength(1)
    expect(cart.products[0].product).toEqual(mockProduct.product)
    expect(cart.products[0].count).toBe(1)
    expect(cart.idList).toHaveLength(1)
    expect(cart.idList[0]).toBe(mockProduct.product.id)
  })

  test('увеличение количества товара в корзине', () => {
    store.dispatch(addProduct({ product: mockProduct.product }))
    store.dispatch(incrementProductCount({ id: mockProduct.product.id }))
    const cart: CartType = store.getState()
    expect(cart.products).toHaveLength(1)
    expect(cart.products[0].count).toBe(2)
  })

  test('уменьшение количества товара в корзине', () => {
    store.dispatch(addProduct({ product: mockProduct.product, count: 2 }))
    store.dispatch(decrementProductCount({ id: mockProduct.product.id }))
    const cart: CartType = store.getState()
    expect(cart.products).toHaveLength(1)
    expect(cart.products[0].count).toBe(1)
  })

  test('не должно уменьшать количество с 1 до 0', () => {
    store.dispatch(addProduct({ product: mockProduct.product }))
    store.dispatch(decrementProductCount({ id: mockProduct.product.id }))
    const cart: CartType = store.getState()
    expect(cart.products).toHaveLength(1)
    expect(cart.products[0].count).toBe(1)
  })

  test('удаление товара из корзины', () => {
    store.dispatch(addProduct({ product: mockProduct.product }))
    store.dispatch(deleteProduct({ id: mockProduct.product.id }))
    const cart: CartType = store.getState()
    expect(cart.products).toHaveLength(0)
    expect(cart.idList).toHaveLength(0)
  })

  test('очистка (удаление всех товаров) корзины', () => {
    store.dispatch(addProduct({ product: mockProduct.product }))
    store.dispatch(clearCart())
    const cart: CartType = store.getState()
    expect(cart.products).toHaveLength(0)
    expect(cart.idList).toHaveLength(0)
  })
})
