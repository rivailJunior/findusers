import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { UserDescription } from '../src/components/userDescription'
import { UserValue } from '../src/model/user'

afterEach(cleanup)

describe('User Description Component', () => {
    test('Render Correctly', () => {
        const container = renderer.create(<UserDescription userData={UserValue} />)
        container.toJSON();
        expect(container).toMatchSnapshot()
    })

    test('Show all informations descriptions on Component', () => {
        render(<UserDescription userData={UserValue} />)
        expect(screen.getByText(/rivail.rj@gmail.com/i)).toBeInTheDocument()
        expect(screen.getByText(/Followers: /i)).toBeInTheDocument()
        expect(screen.getByText(/Following: /i)).toBeInTheDocument()
        expect(screen.getByText(/Full Stack developer, javascript lover and an open source enthusiastic./i)).toBeInTheDocument()
    })

})