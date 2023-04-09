import { useState } from 'react'

import { Button } from '../../ui/Button'
import { AdminPanelStl } from './AdminPanel.styled'

import { careArray } from '../../helpers/typeCare'

import { ProductForm } from '../../components/adminComponents/productForm/ProductForm'
import { AdminProductsList } from './AdminProductsList'

import { useAppDispatch } from '../../store/hooks'
import {
  ProductType,
  deleteAllProducts,
} from '../../store/reducers/productsSlice'

import Container from '../../helperComponentsStyled/Container'

export const AdminPanel = () => {
  const dispatch = useAppDispatch()

  const [productValues, setProductValues] = useState<ProductType>({
    id: '',
    url: '',
    title: '',
    sizeType: '',
    size: '',
    barcode: '',
    manufactur: '',
    brand: '',
    type_care: [...careArray.map((care) => care.typeCare)],
    description: '',
    price: 0,
  })

  return (
    <AdminPanelStl>
      <Container columns>
        <h1 className="admin__title">Административная панель</h1>
        <div className="admin">
          <ProductForm product={productValues} />
          <div className="product__title">
            <span>Штрихкод</span>
            <span>Бренд</span>
            <span>Производитель</span>
            <span>Название</span>
            <span>Ед. измерения</span>
            <span>Вес / Объем</span>
            <span>Типы ухода</span>
            <span>Цена</span>
            <span>Url картинки</span>
            <span></span>
          </div>

          <AdminProductsList />
          <Button
            text="Удалить все"
            padding="10px 30px"
            handleClick={() => dispatch(deleteAllProducts())}
          />
        </div>
      </Container>
    </AdminPanelStl>
  )
}
