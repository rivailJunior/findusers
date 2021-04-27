import React from 'react'
import { unmountComponentAtNode } from "react-dom";
import { fireEvent, render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { InformationCard } from '../src/components/informationCard';


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

describe('Informationcard', () => {
    test('Render Correctly', () => {
        const container = renderer.create(<InformationCard mainText="javascript" title="language" />)
        container.toJSON();
        expect(container).toMatchSnapshot()
    })

    test('Show informations on capitalized', () => {
        render(<InformationCard mainText="javascript" title="language" />, container)
        expect(screen.getByText(/Javascript/i)).toBeInTheDocument();
        expect(screen.getByText(/language/i)).toBeInTheDocument();
    })

})