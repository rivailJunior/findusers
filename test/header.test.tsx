import React from 'react'
import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { Header } from '../src/components/header/header'

afterEach(cleanup)

const fakeFn = jest.fn()
describe('Header Component', () => {
    test('Render Correctly', () => {
        const container = renderer.create(<Header userName="Rivail Junior" labelRight="Sair" handleRight={fakeFn} />)
        container.toJSON();
        expect(container).toMatchSnapshot()
    })

    test('Click on logout button', () => {
        render(<Header userName="Rivail Junior" labelRight="Sair" handleRight={fakeFn} />)
        fireEvent.click(screen.getByText(/Sair/i));
        expect(fakeFn).toHaveBeenCalled()
        expect(fakeFn).toHaveBeenCalledTimes(1)
    })


    test('Hide Search field', () => {
        render(<Header userName="Rivail Junior" labelRight="Sair" />)
        expect(screen.queryByText('Buscar Usuario')).not.toBeInTheDocument()
    })


})