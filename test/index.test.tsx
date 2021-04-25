import React from 'react'
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import Index from '../src/pages/index'

afterEach(cleanup)

describe('Index Page', () => {
  test('Snapshot', () => {
    const index = renderer.create(<Index />)
    index.toJSON()
    expect(index).toMatchSnapshot()
  })

  test('Show user a button to login in github and some informations', () => {
    const { getByText } = render(<Index />)

    expect(
      getByText(/Olá Avaliador!/i)
    ).toBeInTheDocument()
    expect(
      getByText(
        /Para realizar algumas requisições precisamos dessa etapa inicial, o FindUser não ficará com nenhum dado seu./i
      )
    ).toBeInTheDocument()
    expect(getByText(/Login with Git/i)).toBeInTheDocument()
    expect(getByText(/Login with Git/i)).toHaveAttribute('href')
  })
})
