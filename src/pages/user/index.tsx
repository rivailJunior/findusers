import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { doPostRequestLogin } from '../../provider/requestProvider'
import { handleRedirect, handleSession } from '../../utils/sessionValidate'
import useSession from '../../context/useSession'
import useRepositories from '../../context/useRepositories'
import { ListRepositories } from '../../components/list'
import styles from './user.module.scss'
import { GridContainer, GridContainerItem } from '../../components/gridContainer'
import { ErrorFeedback } from '../../components/errorFeedback'
import { Header } from '../../components/header'
import { UserDescription } from '../../components/userDescription'

const Index = ({ userData, token }): JSX.Element => {
	const { user, sessionToken, removeSession } = useSession(token, userData)
	const { findRepositories, repositories, repoRequestLoading } = useRepositories();

	useEffect(() => {
		if (user) {
			findRepositories(user?.login, sessionToken)
		}
	}, [user])

	useEffect(() => {
		console.log('respo', repositories, user)
	}, [repositories])

	return (
		<div>
			<Header userName={user?.name} labelRight="Sair" handleRight={() => removeSession()} />
			<GridContainer>
				<GridContainerItem size={12}>
					<UserDescription userData={userData} />
				</GridContainerItem>

			</GridContainer>
			<GridContainer>
				<GridContainerItem size={12}>
					<ListRepositories data={repositories} handleClick={(repo) => {
						console.log('clickei', repo)
					}} />
				</GridContainerItem>
			</GridContainer>
		</div>

	)
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	query
}) => {
	try {
		const code = query.code;
		const accessToken = handleSession(req, res)
		const { user, token } = await doPostRequestLogin(code, accessToken)
		return {
			props: {
				userData: user,
				token: token
			}
		}
	} catch (err) {
		if (err === 'bad_verification_code' || err?.response?.status === 401) {
			handleRedirect(req, res)
		}
		return {
			props: {}
		}
	}
}
export default Index
