import { User, UserValue } from './../src/model/user';
import { cleanup } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

describe('User types and Value', () => {
    test('UserValues snapshot', () => {
        expect(UserValue).toMatchSnapshot({
            id: UserValue.id
        })
    })
})