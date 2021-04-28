
import { repositoryMockValue } from '../src/model/repository';

import { cleanup } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

describe('User types and Value', () => {
    test('UserValues snapshot', () => {
        expect(repositoryMockValue).toMatchSnapshot({
            id: repositoryMockValue.id
        })
    })
})