import React from 'react'
import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { ListRepositories } from '../src/components/list/list'

afterEach(cleanup)

const arrayFake = Array(10).fill(1)

const fakeFn = jest.fn()
describe('List Component', () => {
    test('Render Correctly', () => {
        const container = renderer.create(<ListRepositories data={arrayFake} handleClick={fakeFn} />)
        container.toJSON();
        expect(container).toMatchSnapshot()
    })

    test('Show correct total itens on list', () => {
        const { getAllByTestId } = render(<ListRepositories data={arrayFake} handleClick={fakeFn} />)
        const listLi = getAllByTestId('listItem')
        expect(listLi).toHaveLength(arrayFake.length)
    })

    test('Click on list item', () => {
        const { getAllByTestId } = render(<ListRepositories data={arrayFake} handleClick={fakeFn} />)
        const listLi = getAllByTestId('listItem')
        fireEvent.click(listLi[0])
        expect(fakeFn).toHaveBeenCalledTimes(1)
        // expect(listLi).toHaveLength(arrayFake.length)
    })

})