import React from 'react'
import { unmountComponentAtNode } from "react-dom";
import { fireEvent, render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { BreadCrumb } from '../src/components/breadCrumb'

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
const fn = jest.fn()
const breadCrumb = [{ label: 'Descrição usuário/', onClick: fn, active: true }, { label: 'Detalhes repositório/', onClick: () => null }]

describe('BreadCrumb', () => {
    test('Render Correctly', () => {
        const container = renderer.create(<BreadCrumb titles={breadCrumb} />)
        container.toJSON();
        expect(container).toMatchSnapshot()
    })

    test('Show more than one value', () => {
        render(<BreadCrumb titles={breadCrumb} />, container)
        expect(screen.getByText(/Descrição usuário/i)).toBeInTheDocument();
        expect(screen.getByText(/Detalhes repositório/i)).toBeInTheDocument();
    })

    test('Show one of than with active class', () => {
        render(<BreadCrumb titles={breadCrumb} />, container)
        const getItems = screen.getAllByTestId('labelBread')
        expect(getItems[0]).toHaveClass('active');
        expect(getItems[1]).not.toHaveClass('active');
    })

    test('Handle Click on ative item', () => {

        render(<BreadCrumb titles={breadCrumb} />, container)
        const getItems = screen.getAllByTestId('labelBread')
        fireEvent.click(getItems[0])
        expect(fn).toHaveBeenCalledTimes(1);
    })
})