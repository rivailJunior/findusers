import React from 'react'
import { GetServerSideProps } from 'next'
import { handleRedirect, handleSession } from '../utils/sessionValidate'

const Index = () => {
	return (
		<div className="container">
			<h1>Olá Avaliador!</h1>
			<h5>
				Para realizar algumas requisições precisamos dessa etapa inicial, o
				FindUser não ficará com nenhum dado seu.
			</h5>
			<ul>
				<li>
					Ao clicar no botão abaixo, você será será redirecionado ao login com o gitbuh.
				</li>
				<li>
					Após login, você será redirecionado a pagina inicial dessa avaliação
				</li>
			</ul>
			<a
				href="https://github.com/login/oauth/authorize?client_id=4ef14be8aa943c3e53e2&redirect_uri:http://localhost:3000&state=findusers&allow_singnup=true"
				type="button"
				className="btn"
			>
				Login with Git
			</a>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	query
}) => {
	const accessToken = handleSession(req, res)
	if (accessToken) {
		handleRedirect(req, res, '/user')
	}
	return {
		props: {
		}
	}
}

export default Index
