import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { unmountComponentAtNode } from "react-dom";
import Index from '../src/pages/user'
import { UserValue } from '../src/model/user';

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

jest.mock("../src/components/header/header", () => {
    return function Header({ handleRight }) {
        return (
            <div>
                <div>Rivail Santos</div>
                <button onClick={handleRight}>Sair</button>
            </div>
        )
    }
})

jest.mock("../src/context/useSession", () => {
    return function useSession() {
        return {
            removeSession: () => jest.fn(),
            setSession: () => jest.fn(),
            user: {
                avatar_url: "https://avatars.githubusercontent.com/u/5783143?v=4",
                bio: "Full Stack developer, javascript lover and an open source enthusiastic.",
                blog: "",
                company: "Qtarkuss",
                created_at: "2013-10-26T19:17:03Z",
                email: "rivail.rj@gmail.com",
                events_url: "https://api.github.com/users/rivailJunior/events{/privacy}",
                followers: 4,
                followers_url: "https://api.github.com/users/rivailJunior/followers",
                following: 2,
                following_url: "https://api.github.com/users/rivailJunior/following{/other_user}",
                gists_url: "https://api.github.com/users/rivailJunior/gists{/gist_id}",
                gravatar_id: "",
                hireable: true,
                html_url: "https://github.com/rivailJunior",
                id: 0,
                location: "Brasil",
                login: "rivailJunior",
                name: "Rivail Santos",
                node_id: "MDQ6VXNlcjU3ODMxNDM=",
                organizations_url: "https://api.github.com/users/rivailJunior/orgs",
                public_gists: 0,
                public_repos: 12,
                received_events_url: "https://api.github.com/users/rivailJunior/received_events",
                repos_url: "https://api.github.com/users/rivailJunior/repos",
                site_admin: false,
                starred_url: "https://api.github.com/users/rivailJunior/starred{/owner}{/repo}",
                subscriptions_url: "https://api.github.com/users/rivailJunior/subscriptions",
                twitter_username: null,
                type: "User",
                updated_at: "2021-04-25T03:20:04Z",
                url: "https://api.github.com/users/rivailJunior"
            },
            sessionToken: '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',
            findUser: () => jest.fn(),
            findError: false
        }
    }
});

jest.mock('../src/context/useRepositories', () => {
    return function useRepositories() {
        return {
            findRepositories: jest.fn(),
            repositories: [],
            error: false,
            repoRequestLoading: false,
            repository: {},
            getRepositoryByName: jest.fn()
        }
    }
})

describe('Index User Page', () => {
    test('Render correctly', () => {
        const container = renderer.create(<Index userData={UserValue} token={''} />)
        container.toJSON()

        expect(container).toMatchSnapshot()
    })

    test('Show all components in page', () => {
        render(<Index userData={UserValue} token={''} />, container);
        expect(screen.getByText(/sair/i)).toBeInTheDocument();
        expect(screen.getByText(/rivail/)).toBeInTheDocument();
        const gridContianer = screen.getAllByTestId('gridContainer');
        const gridItem = screen.getAllByTestId('gridContainerItem');
        expect(gridContianer).toHaveLength(2)
        fireEvent.click(screen.getByText(/sair/i))
        expect(gridContianer[0]).toContainElement(gridItem[0])
        expect(screen.queryByText('Nenhum novo usuario encontrado')).not.toBeInTheDocument();

    })
})
