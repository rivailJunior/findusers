import React from 'react'
import { unmountComponentAtNode } from "react-dom";
import { render, cleanup, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { UserDescription } from '../src/components/userDescription'
import { UserValue } from '../src/model/user'

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

describe('User Description Component', () => {
    test('Render Correctly', () => {
        const container = renderer.create(<UserDescription userData={UserValue} />, document)
        container.toJSON();
        expect(container).toMatchSnapshot()
    })

    test('Show all informations descriptions on Component', () => {
        render(<UserDescription userData={UserValue} />, document)
        expect(screen.getByText(/rivail.rj@gmail.com/i)).toBeInTheDocument()
        expect(screen.getByText(/Seguidores: /i)).toBeInTheDocument()
        expect(screen.getByText(/Seguindo: /i)).toBeInTheDocument()
        expect(screen.queryByAltText(/Imagem do usuário/i)).toBeInTheDocument()
        expect(screen.getByText(/Full Stack developer, javascript lover and an open source enthusiastic./i)).toBeInTheDocument()
    })

    test('Render with user img', () => {
        render(<UserDescription userData={UserValue} />, document)
        expect(screen.queryByAltText(/Imagem do usuário/i)).toBeInTheDocument()
        expect(screen.queryByAltText(/Imagem nao encontrada/i)).not.toBeInTheDocument()
    })

    test('Render without user img', () => {
        UserValue.avatar_url = ""
        render(<UserDescription userData={UserValue} />, document)
        expect(screen.queryByAltText(/Imagem do usuário/i)).not.toBeInTheDocument()
        expect(screen.queryByAltText(/Imagem nao encontrada/i)).toBeInTheDocument()
    })

})