import React from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

interface CustomRenderOptions {
  route?: string
  renderOptions?: Omit<RenderOptions, 'queries'>
}

function customRender(
  ui: React.ReactElement,
  { route = '/', ...renderOptions }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children?: React.ReactNode }) {
    return <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { customRender as render, userEvent }
