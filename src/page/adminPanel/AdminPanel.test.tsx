import React from 'react'
import { render, screen } from '@testing-library/react'

import { Provider } from 'react-redux'

import { AdminPanel } from './AdminPanel'

import { store } from '../../store/store'

// Тест на рендер панели
test('Компонент AdminPanel рендерится без ошибок', () => {
  render(
    <Provider store={store}>
      <AdminPanel />
    </Provider>
  )
})

test('Заголовок административной панели отображается', () => {
  render(
    <Provider store={store}>
      <AdminPanel />
    </Provider>
  )

  const adminTitle = screen.getByText(/Административная панель/i)
  expect(adminTitle).toBeInTheDocument()
})
