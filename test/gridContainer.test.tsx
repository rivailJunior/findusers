import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { ErrorFeedback } from '../src/components/errorFeedback/errorFeedback'
import { GridContainer, GridContainerItem } from '../src/components/gridContainer/gridContainer'

afterEach(cleanup)

describe('Grid Contaiiner', () => {
    test('Render Correctly', () => {
        const container = renderer.create(<GridContainer >
            <ErrorFeedback title="Nenhum repositorio encontrado" />
        </GridContainer>)
        container.toJSON();
        expect(container).toMatchSnapshot()
    })

    test('Wrapper a child component', () => {
        const { getByText } = render(<GridContainer >
            <ErrorFeedback title="Nenhum repositorio encontrado!" />
        </GridContainer>)
        expect(getByText(/Nenhum repositorio encontrado!/i)).toBeInTheDocument();
    })
    test('Wrapper more than one child component', () => {
        const { getByText, getByTestId } = render(<GridContainer >
            <ErrorFeedback title="Nenhum repositorio encontrado!" />
            <ErrorFeedback title="Parece que deu bom!" />
        </GridContainer>)
        expect(getByText(/Nenhum repositorio encontrado!/i)).toBeInTheDocument();
        expect(getByTestId('gridContainer').childNodes).toHaveLength(2)
    })

    test('Render grid without any child componenent', () => {
        const { getByText, getByTestId } = render(<GridContainer />)
        expect(getByTestId('gridContainer').childNodes).toHaveLength(0);
    })

    test('Render grid item with correct size class ', () => {
        const { getByTestId } = render(<GridContainer >
            <GridContainerItem size={12} >
                <ErrorFeedback title="Nenhum item encontrado" />
            </GridContainerItem>
        </GridContainer>)
        expect(getByTestId('gridContainerItem')).toHaveClass('containerItem12');
    })

    test('Render grid item without any child componenent', () => {
        const { getByTestId } = render(<GridContainer >
            <GridContainerItem size={12} />
        </GridContainer>)
        expect(getByTestId('gridContainerItem').childNodes).toHaveLength(0);
    })
})