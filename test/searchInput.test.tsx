import React from 'react'
import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { SearchInput } from '../src/components/searchInput'

afterEach(cleanup)
const fakeFn = jest.fn()

describe('SearchInput Component', () => {
    test('Render Correctly', () => {
        const container = renderer.create(<SearchInput handleSearch={fakeFn} placeholder="Search" />)
        container.toJSON();
        expect(container).toMatchSnapshot()
    })

    test('Show Button and Input', () => {
        render(<SearchInput handleSearch={fakeFn} placeholder="Search" />)
        expect(screen.getByText(/Ok/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument()
    })

    test('Dont let user search with blank field', () => {
        render(<SearchInput handleSearch={fakeFn} placeholder="Search" />)
        fireEvent.change(screen.getByPlaceholderText(/Search/i), {
            target: {
                value: ""
            }
        })
        expect(screen.getByText(/Ok/i)).toHaveAttribute('disabled')
        fireEvent.click(screen.getByText(/OK/i))
        expect(fakeFn).toHaveBeenCalledTimes(0)
    })

    test('Return user typed', () => {
        render(<SearchInput handleSearch={fakeFn} placeholder="Search" />)
        fireEvent.change(screen.getByPlaceholderText(/Search/i), {
            target: {
                value: 'rivail junior'
            }
        })
        fireEvent.click(screen.getByText(/ok/i))
        expect(fakeFn).toHaveBeenCalledTimes(1)
        expect(fakeFn).toHaveBeenCalledWith('rivail junior')
    })

})