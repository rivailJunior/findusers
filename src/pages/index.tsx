import React from 'react'
import { GetServerSideProps } from 'next'
import { handleRedirect, handleSession } from '../utils/sessionValidate'

const Index = () => {

	const client_id = process.env.REACT_APP_CLIENTID;
	const state = process.env.REACT_APP_STATE;
	const callbackURL = process.env.REACT_APP_CALLBACKURL;
	const url = `https://github.com/login/oauth/authorize?client_id=${ client_id }&redirect_uri:${ callbackURL }&state=${ state }&allow_singnup=true`

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
				href={url}
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
	res
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
