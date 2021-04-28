import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { unmountComponentAtNode } from "react-dom";
import Index from '../src/pages/repositories'
import * as nextRouter from 'next/router';

nextRouter.useRouter = jest.fn();

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

jest.mock("../src/components/header/header", () => {
    return function Header() {
        return (
            <div>
                <div>Rivail Santos</div>
                <button>Sair</button>
            </div>
        )
    }
})


jest.mock('../src/components/breadcrumb/breadCrumb', () => {

    return function BreadCrumb() {
        return (
            <div>
                <div>Descricao usuario/</div>
                <div>Descricao do repositorio/</div>
            </div>

        )
    }
})

const user = {
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
}

jest.mock("../src/context/useSession", () => {
    return function useSession() {
        return {
            removeSession: () => jest.fn(),
            setSession: () => jest.fn(),
            user,
            sessionToken: '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',
            findUser: jest.fn(() => { }),
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
});

describe('Index Repository Page', () => {

    nextRouter.useRouter.mockImplementation(() => ({ route: '/respositories', query: { repository: 'moveon' } }));

    test('Render correctly', () => {
        const container = renderer.create(<Index />)
        container.toJSON()
        expect(container).toMatchSnapshot()
    })

    test('Show all components in page', () => {
        nextRouter.useRouter.mockImplementation(() => ({ route: '/respositories', query: { repository: 'moveon' } }));
        render(<Index />, container);
        expect(screen.getByText(/sair/i)).toBeInTheDocument();
        expect(screen.getByText(/Descricao usuario/)).toBeInTheDocument();
        expect(screen.getByText(/Rivail Santos/)).toBeInTheDocument();
        const gridContianer = screen.getAllByTestId('gridContainer');
        const gridItem = screen.getAllByTestId('gridContainerItem');
        expect(gridContianer).toHaveLength(1)
        fireEvent.click(screen.getByText(/sair/i));
        expect(gridItem).toHaveLength(9)
        expect(screen.queryByText(/language/i)).toBeInTheDocument()
        expect(screen.queryByText(/estrelas/i)).toBeInTheDocument()
        expect(screen.queryByText(/Descrição/i)).toBeInTheDocument()
        expect(screen.queryByText(/você precisa selecionar um repositório/i)).not.toBeInTheDocument()

    })

    test('Show Feedback when dont choose repository', () => {
        nextRouter.useRouter.mockImplementation(() => ({ route: '/respositories', query: null }));
        render(<Index />, container);
        expect(screen.queryByText(/você precisa selecionar um repositório/i)).toBeInTheDocument()

    })

})
