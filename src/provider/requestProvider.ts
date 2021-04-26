
import axios from 'axios'
import { Octokit } from '@octokit/core'

const doPostRequestLogin = async (
	code: any,
	accessToken?: string
): Promise<any> => {
	try {
		let token = accessToken;
		if (!accessToken) {
			const { data } = await axios.post('https://github.com/login/oauth/access_token', {
				client_id: process.env.CLIENT_ID,
				client_secret: process.env.CLIENT_SECRET,
				redirect_uri: `${ process.env.REACT_APP_CALLBACKURL }/user`,
				state: 'findusers',
				code
			}, {
				headers: {
					Accept: "application/json"
				}
			});
			token = data['access_token'];
			const error = data['error']
			if (error) throw error;
		}

		const octokit = new Octokit({ auth: token });
		const user = await octokit.request("/user");
		return { user: user.data, token }
	} catch (err) {
		throw err;
	}

}

type iGetParams = {
	userName?: string,
	token: string
}

const getRepositoriesByUserName = async ({
	userName,
	token
}: iGetParams): Promise<any> => {
	const octokit = new Octokit({ auth: token });
	return await octokit.request('/users/{username}/repos', {
		username: userName
	})
}

const getNewUser = async ({
	userName,
	token
}: iGetParams): Promise<any> => {
	const octokit = new Octokit({ auth: token });
	return await octokit.request('/users/{username}', {
		username: userName.replace(/ /g, '')
	})
}

export { doPostRequestLogin, getRepositoriesByUserName, getNewUser }
