import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { doPostRequestLogin } from '../../provider/requestProvider'
import { handleSession } from '../../utils/sessionValidate'
import useSession from '../../context/useSession'
import useRepositories from '../../context/useRepositories'
import { ListRepositories } from '../../components/list/list'
import { GridContainer, GridContainerItem } from '../../components/gridContainer/gridContainer'
import { ErrorFeedback } from '../../components/errorFeedback/errorFeedback'
import Header from '../../components/header/header'
import { UserDescription } from '../../components/userDescription/userDescription'
import { useRouter } from 'next/router'
import BreadCrumb from '../../components/breadcrumb/breadCrumb';
import { breadCrumbTitles } from '../../utils/breadCrumbTitles'
import { handleError } from '../../utils/validateUserWithNoSession'


const Index = ({ userData, token }): JSX.Element => {
	const router = useRouter()
	const { user, removeSession, findUser, findError } = useSession(token, userData)
	const { findRepositories, repositories } = useRepositories();

	useEffect(() => {
		//here will find after login
		if (userData) {
			findRepositories(userData?.login)
		}
	}, [])

	useEffect(() => {
		// here will change when search a new user
		if (user) {
			findRepositories(user?.login)
		}
	}, [user])

	const searchUser = async (userName) => {
		await findUser(userName)
	}

	const handleOpenRepository = (repository) => {
		router.push({
			pathname: '/repositories',
			query: {
				repository: repository.name,
				owner: user.login
			}
		})
	}

	return (
		<div>
			<Header handleSearch={searchUser} userName={user?.name} labelRight="Sair" handleRight={() => removeSession()} />
			{!findError ? (
				<>
					<GridContainer>
						<GridContainerItem size={12}>
							<BreadCrumb titles={breadCrumbTitles} />
						</GridContainerItem>
						<GridContainerItem size={12}>
							<UserDescription userData={user} />
						</GridContainerItem>
					</GridContainer>
					<GridContainer>
						<GridContainerItem size={12}>
							<ListRepositories data={repositories} handleClick={handleOpenRepository} />
						</GridContainerItem>
					</GridContainer>
				</>
			) : (
				<GridContainer>
					<GridContainerItem size={12}>
						<ErrorFeedback title="Nenhum novo usuario encontrado" />
					</GridContainerItem>
				</GridContainer>

			)}

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
		return handleError(err, req, res)
	}
}
export default Index
