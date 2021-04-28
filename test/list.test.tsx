import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { ListRepositories } from '../src/components/list/list'
import { repositoryMockValue } from '../src/model/repository'

import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
    // configurar o elemento do DOM como o alvo da renderização
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // limpar na saída
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

const arrayFake = Array(10).fill(repositoryMockValue)

const fakeFn = jest.fn()
describe('List Component', () => {
    test('Render Correctly', () => {
        const container = renderer.create(<ListRepositories data={arrayFake} handleClick={fakeFn} />)
        container.toJSON();
        expect(container).toMatchSnapshot()
    })

    test('Show correct total itens on list', () => {
        const { getAllByTestId } = render(<ListRepositories data={arrayFake} handleClick={fakeFn} />, container)
        const listLi = getAllByTestId('listItem')
        expect(listLi).toHaveLength(arrayFake.length)
    })

    test('Click on list item', () => {
        const { getAllByTestId } = render(<ListRepositories data={arrayFake} handleClick={fakeFn} />, container)
        const listLi = getAllByTestId('listItem')
        fireEvent.click(listLi[0])
        expect(fakeFn).toHaveBeenCalledTimes(1)
    })


    test('Click on sort', (done) => {
        render(<ListRepositories data={arrayFake} handleClick={fakeFn} />, container)
        const list = screen.getByTestId('list')
        const btnReverse = screen.getByTestId("btnReverse");
        expect(list.className).toBe("item");
        fireEvent.click(btnReverse)
        const sortedList = screen.getByTestId('list')
        expect(sortedList.className).toBe("item listReverse")
        done()

    })

})