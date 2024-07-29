const CC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
const SC_BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

const CONSTANTS = {
    CC_BACKEND_URL,
    SC_BACKEND_URL,

    /** ${BACKEND_URL}/projects */
    PROJECT_DATAS_URL: `${CC_BACKEND_URL}/projects`,
    /** ${BACKEND_URL}/project/user/:userId */
    GET_PROJECT_DATAS_BY_USER_ID_URL: `${CC_BACKEND_URL}/projects/user`,
    /** ${BACKEND_URL}/project/:projectId */
    GET_PROJECT_DATAS_BY_PROJECT_ID_URL: `${CC_BACKEND_URL}/projects`,

    /** ${BACKEND_URL}/travels */
    TRAVEL_DATAS_URL: `${CC_BACKEND_URL}/travels`,
    SC_TRAVEL_DATAS_URL: `${SC_BACKEND_URL}/travels`,

    /** /auth/signin */
    AUTH_SIGNIN: '/auth/signin',
};

export default CONSTANTS;