

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

const CONSTANTS = {
    BACKEND_URL,
    /** ${BACKEND_URL}/projects */
    PROJECT_DATAS_URL: `${BACKEND_URL}/projects`,
    /** ${BACKEND_URL}/project/user/:userId */
    GET_PROJECT_DATAS_BY_USER_ID_URL: `${BACKEND_URL}/projects/user`,
    /** ${BACKEND_URL}/project/:projectId */
    GET_PROJECT_DATAS_BY_PROJECT_ID_URL: `${BACKEND_URL}/projects`,

    /** /auth/signin */
    AUTH_SIGNIN: '/auth/signin',
};

export default CONSTANTS;