import { getUniqueManufactures } from '../../helpers/getUniqueManufactures'
import productsReducer, {
  getProducts,
  addProduct,
  deleteProduct,
  deleteAllProducts,
  ProductType,
  ProductsType,
} from './productsSlice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// тесты для редьюсера, отвечающего за обновление списка продуктов
describe('products reducer', () => {
  const initialState: ProductsType = {
    products: [],
    manufactur: [],
  }
  const testProduct1: ProductType = {
    id: '1',
    title: 'Product 1',
    manufactur: 'Brand A',
  }
  const testProduct2: ProductType = {
    id: '2',
    title: 'Product 2',
    manufactur: 'Brand B',
  }

  it('проверка соответствия начального состояния заданному значению', () => {
    expect(productsReducer(undefined, {} as PayloadAction)).toEqual(
      initialState
    )
  })

  it('проверка действия getProducts (список товаров - аргумент)', () => {
    const products: ProductType[] = [testProduct1, testProduct2]
    const expectedState: ProductsType = {
      products,
      manufactur: ['Brand A', 'Brand B'],
    }
    expect(productsReducer(initialState, getProducts(products))).toEqual(
      expectedState
    )
  })

  it('проверка обработки addProduct (добавление товара)', () => {
    const initialState: ProductsType = {
      products: [testProduct1],
      manufactur: ['Brand A'],
    }
    const newProduct: ProductType = {
      id: '3',
      title: 'Product 3',
      manufactur: 'Brand C',
    }
    const expectedState: ProductsType = {
      products: [testProduct1, newProduct],
      manufactur: ['Brand A', 'Brand C'],
    }
    expect(
      productsReducer(initialState, addProduct({ product: newProduct }))
    ).toEqual(expectedState)
  })

  it('проверка обработки deleteProduct (удаление товара)', () => {
    const initialState: ProductsType = {
      products: [testProduct1, testProduct2],
      manufactur: ['Brand A', 'Brand B'],
    }
    const expectedState: ProductsType = {
      products: [testProduct2],
      manufactur: ['Brand B'],
    }
    expect(productsReducer(initialState, deleteProduct({ id: '1' }))).toEqual(
      expectedState
    )
  })

  it('проверка обработки deleteAllProducts (удаление всех товаров из списка)', () => {
    const initialState: ProductsType = {
      products: [testProduct1, testProduct2],
      manufactur: ['Brand A', 'Brand B'],
    }
    const expectedState: ProductsType = {
      products: [],
      manufactur: [],
    }
    expect(productsReducer(initialState, deleteAllProducts())).toEqual(
      expectedState
    )
  })
})

// тесты функции получения списка уникальных производителей
describe('getUniqueManufactures helper function', () => {
  const testProducts: ProductType[] = [
    { id: '1', title: 'Product 1', manufactur: 'Brand A' },
    { id: '2', title: 'Product 2', manufactur: 'Brand B' },
    { id: '3', title: 'Product 3', manufactur: 'Brand A' },
    { id: '4', title: 'Product 4', manufactur: 'Brand C' },
  ]

  it('возвращение списка уникальных производителей', () => {
    const expectedManufacturers = ['Brand A', 'Brand B', 'Brand C']
    expect(getUniqueManufactures(testProducts)).toEqual(expectedManufacturers)
  })

  it('возвращение пустого массива при передаче пустого массива товаров', () => {
    expect(getUniqueManufactures([])).toEqual([])
  })
})
