import Container from '../../helperComponentsStyled/Container'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  ProductType,
  deleteAllProducts,
  deleteProduct,
} from '../../store/reducers/productsSlice'
import { AdminPageStl } from './adminPage.styled'
import { ProductForm } from '../../components/adminComponents/productForm/ProductForm'
import { Button } from '../../ui/Button'
import { ReactComponent as DeleteSvg } from '../../assets/icons/delete.svg'
import { ReactComponent as EditSvg } from '../../assets/icons/edit.svg'
import { useState } from 'react'
import { careArray } from '../../helpers/typeCare'
import { Modal } from '../../helperComponentsStyled/Modal'

export const AdminPage = () => {
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  const handleClick = (product: ProductType) => {
    setProductValues({ ...product })
    setIsModalOpen(true)
  }

  const products = useAppSelector((state) => state.products.products)

  return (
    <AdminPageStl>
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
          {products?.map((product: ProductType) => (
            <div key={product.id} className="product">
              <div>{product.barcode}</div>
              <div>{product.brand}</div>
              <div>{product.manufactur}</div>
              <div>{product.title}</div>
              <div>{product.sizeType}</div>
              <div>{product.size}</div>
              <div className="product__careType">
                {product.type_care?.map((care) => (
                  <span key={care}>{care}</span>
                ))}
              </div>
              <div>{product.price}</div>
              <div>{product.url}</div>
              <div className="product__wrapper">
                <Button
                  text=""
                  padding="6px"
                  handleClick={() => {
                    handleClick(product)
                  }}
                >
                  <EditSvg />
                </Button>
                <Button
                  text=""
                  padding="4px"
                  handleClick={() =>
                    dispatch(deleteProduct({ id: product.id! }))
                  }
                >
                  <DeleteSvg />
                </Button>
              </div>
            </div>
          ))}
          <Button
            text="Удалить все"
            padding="10px 30px"
            handleClick={() => dispatch(deleteAllProducts())}
          />
        </div>
      </Container>
      {isModalOpen && (
        <Modal toggle={setIsModalOpen}>
          <div className="modal__productForm">
            <ProductForm
              product={productValues}
              textButton="Изменить"
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </Modal>
      )}
    </AdminPageStl>
  )
}
