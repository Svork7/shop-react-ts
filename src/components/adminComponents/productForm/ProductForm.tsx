import { Field, Form, Formik } from 'formik'
import { ProductType, addProduct } from '../../../store/reducers/productsSlice'
import { useAppDispatch } from '../../../store/hooks'
import { ProductFormStl } from './productForm.styled'
import { Button } from '../../../ui/Button'
import { careArray } from '../../../helpers/typeCare'
import { v4 as uuid } from 'uuid'
import { useEffect, useState } from 'react'

interface ProductFormProps {
  product: ProductType
  textButton?: string
  setIsModalOpen?: (value: boolean) => void
}

export function ProductForm({
  product,
  textButton = 'Добавить',
  setIsModalOpen,
}: ProductFormProps) {
  const dispatch = useAppDispatch()
  const [initialValues, setInitialValues] = useState<ProductType>(product)

  useEffect(() => {
    setInitialValues(product)
  }, [product])

  return (
    <ProductFormStl>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: ProductType, { resetForm }) => {
          dispatch(addProduct({ product: values }))
          if (setIsModalOpen) {
            setIsModalOpen(false)
          }
          resetForm()
        }}
      >
        {({ values, handleChange }) => {
          return (
            <Form className="form">
              <label className="form__label form__label--static">
                <input
                  id="id"
                  name="id"
                  defaultValue={values.id ? values.id : (values.id = uuid())}
                />
                Уникальный идентификатор: {values.id}
              </label>
              <label className="form__label">
                <Field
                  id="title"
                  name="title"
                  required
                  type="text"
                  placeholder="Название товара"
                  onChange={handleChange}
                  value={values.title}
                />
              </label>
              <label className="form__label">
                <Field
                  id="url"
                  name="url"
                  type="text"
                  placeholder="Url картинки"
                  onChange={handleChange}
                  value={values.url}
                />
              </label>
              <label className="form__label">
                <Field
                  id="barcode"
                  name="barcode"
                  type="text"
                  placeholder="Штрихкод"
                  onChange={handleChange}
                  value={values.barcode}
                />
              </label>
              <label className="form__label">
                <Field
                  id="manufacturer"
                  name="manufacturer"
                  type="text"
                  placeholder="Производитель"
                  onChange={handleChange}
                  value={values.manufactur}
                />
              </label>
              <label className="form__label">
                <Field
                  id="brand"
                  name="brand"
                  type="text"
                  placeholder="Бренд"
                  onChange={handleChange}
                  value={values.brand}
                />
              </label>
              <label className="form__label">
                <Field
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Описание"
                  onChange={handleChange}
                  value={values.description}
                />
              </label>
              <div className="form__volume">
                <label className="form__label">
                  <Field
                    id="volume"
                    name="volume"
                    type="text"
                    placeholder="Вес / Объем"
                    onChange={handleChange}
                    value={values.size}
                  />
                </label>
                <label className="form__label">
                  <Field
                    type="radio"
                    name="type_volume"
                    checked={values.sizeType === 'Вес'}
                    value={'Вес'}
                  />
                  Вес
                </label>
                <label className="form__label">
                  <Field
                    type="radio"
                    name="type_volume"
                    checked={values.sizeType === 'Объём'}
                    value={'Объём'}
                  />
                  Объём
                </label>
              </div>
              <div className="form__care">
                <label>Типы ухода:</label>
                {careArray.map((value) => (
                  <div key={value.typeCare} className="care__type">
                    <label className="form__label form__label--care">
                      <Field
                        type="checkbox"
                        name="itemType"
                        value={value.typeCare}
                        checked={values.type_care?.includes(value.typeCare)}
                      />
                      <span>{value.title}</span>
                    </label>
                  </div>
                ))}
              </div>
              <label className="form__label">
                <Field
                  id="price"
                  name="price"
                  type="text"
                  placeholder="Цена"
                  onChange={handleChange}
                  value={values.price}
                />
              </label>
              <Button
                type="submit"
                text={textButton ? textButton : 'Добавить'}
                self="flex-start"
                padding="10px 30px"
              />
            </Form>
          )
        }}
      </Formik>
    </ProductFormStl>
  )
}
