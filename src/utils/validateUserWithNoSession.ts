import { handleRedirect, handleSession } from "./sessionValidate";

const handleError = (err, req, res) => {
    if (err === 'bad_verification_code' || err?.response?.status === 401) {
        handleRedirect(req, res)
    }
    return {
        props: {}
    }
}

const validateSession = async (req, res) => {
    try {
        const accessToken = handleSession(req, res);
        if (!accessToken) handleRedirect(req, res);
        return {
            props: {}
        }
    } catch (err) {
        return handleError(err, req, res)
    }
}

export { validateSession, handleError }
