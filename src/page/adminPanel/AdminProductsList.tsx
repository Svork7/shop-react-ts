import { useState } from 'react'

import { Button } from '../../ui/Button'
import { Modal } from '../../helperComponentsStyled/Modal'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ProductType, deleteProduct } from '../../store/reducers/productsSlice'

import { ProductForm } from '../../components/adminComponents/productForm/ProductForm'

import { ReactComponent as DeleteSvg } from '../../assets/icons/delete.svg'
import { ReactComponent as EditSvg } from '../../assets/icons/edit.svg'

import { careArray } from '../../helpers/typeCare'

export const AdminProductsList = () => {
  const products = useAppSelector((state) => state.products.products)
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
  return (
    <>
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
          <div className="">
            <Button
              text=""
              padding="5px"
              handleClick={() => {
                handleClick(product)
              }}
            >
              <EditSvg />
            </Button>
            <Button
              text=""
              padding="5px"
              handleClick={() => dispatch(deleteProduct({ id: product.id! }))}
            >
              <DeleteSvg />
            </Button>
          </div>
        </div>
      ))}{' '}
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
    </>
  )
}
