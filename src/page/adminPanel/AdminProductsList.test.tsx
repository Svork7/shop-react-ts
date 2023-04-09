import { render, screen, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { AdminProductsList } from './AdminProductsList'

describe('AdminProductsList', () => {
  afterEach(() => {
    cleanup()
  })

  it('отображает список товаров с параметрами в административной панели', () => {
    const products = [
      {
        id: '1',
        url: 'http://image.jpg',
        title: 'Product 1',
        sizeType: 'Вес',
        size: '100г',
        barcode: '3456345456456',
        manufactur: 'Manufacturer 1',
        brand: 'Brand 1',
        type_care: ['для рук', 'для ног'],
        description: 'описание',
        price: 10.99,
      },
      {
        id: '2',
        url: 'http://image2.jpg',
        title: 'Product 2',
        sizeType: 'Объем',
        size: '200мл',
        barcode: '345456473456',
        manufactur: 'Manufacturer 2',
        brand: 'Brand 2',
        type_care: ['для волос', 'для лица'],
        description: 'описание 2',
        price: 20.99,
      },
    ]

    const mockStore = configureMockStore()
    const store = mockStore({
      products: {
        products,
      },
    })

    render(
      <Provider store={store}>
        <AdminProductsList />
      </Provider>
    )

    expect(screen.getByText(products[0].barcode)).toBeInTheDocument()
    expect(screen.getByText(products[0].brand)).toBeInTheDocument()
    expect(screen.getByText(products[0].manufactur)).toBeInTheDocument()
    expect(screen.getByText(products[0].title)).toBeInTheDocument()
    expect(screen.getByText(products[0].sizeType)).toBeInTheDocument()
    expect(screen.getByText(products[0].size)).toBeInTheDocument()
    expect(screen.getByText(products[0].type_care[0])).toBeInTheDocument()
    expect(screen.getByText(products[0].type_care[1])).toBeInTheDocument()
    expect(screen.getByText(products[0].price)).toBeInTheDocument()
    expect(screen.getByText(products[0].url)).toBeInTheDocument()

    expect(screen.getByText(products[1].barcode)).toBeInTheDocument()
    expect(screen.getByText(products[1].brand)).toBeInTheDocument()
    expect(screen.getByText(products[1].manufactur)).toBeInTheDocument()
    expect(screen.getByText(products[1].title)).toBeInTheDocument()
    expect(screen.getByText(products[1].sizeType)).toBeInTheDocument()
    expect(screen.getByText(products[1].size)).toBeInTheDocument()
    expect(screen.getByText(products[1].type_care[0])).toBeInTheDocument()
    expect(screen.getByText(products[1].type_care[1])).toBeInTheDocument()
    expect(screen.getByText(products[1].price)).toBeInTheDocument()
    expect(screen.getByText(products[1].url)).toBeInTheDocument()
  })
})
