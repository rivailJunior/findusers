import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { ErrorFeedback } from '../src/components/errorFeedback'

afterEach(cleanup)

describe('Error Component', () => {
    test('Render Correctly', () => {
        const container = renderer.create(<
            ErrorFeedback title="Nenhum repositório encontrado!" />)
        container.toJSON();
        expect(container).toMatchSnapshot()
    })

    test('Show with title and subtitle', () => {
        const { getByText } = render(<ErrorFeedback title="Nenhum usuario encotrado!" subTitle="Busque outro usuario" />)
        expect(getByText(/Nenhum usuario encotrado!/i)).toBeInTheDocument();
        expect(getByText(/Busque outro usuario/i)).toBeInTheDocument();
    })

    test('Show only title error message', () => {
        const { getByText, getByTestId } = render(<ErrorFeedback title="Nenhum usuario encotrado!" />)
        expect(getByText(/Nenhum usuario encotrado!/i)).toBeInTheDocument();
        expect(screen.queryByTestId('subTitleError')).not.toBeInTheDocument();
    })
})