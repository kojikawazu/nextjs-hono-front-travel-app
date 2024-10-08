const CC_BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
const SC_BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

const CONSTANTS = {
    CC_BACKEND_URL,
    SC_BACKEND_URL,

    /** ${BACKEND_URL}/projects */
    /** ${BACKEND_URL}/projects/:projectId */
    PROJECT_DATAS_URL: `${CC_BACKEND_URL}/projects`,
    SC_PROJECT_DATAS_URL: `${SC_BACKEND_URL}/projects`,

    /** ${BACKEND_URL}/projects/user/:userId */
    GET_PROJECT_DATAS_BY_USER_ID_URL: `${CC_BACKEND_URL}/projects/user`,
    SC_GET_PROJECT_DATAS_BY_USER_ID_URL: `${SC_BACKEND_URL}/projects/user`,
    /** ${BACKEND_URL}/projects/calendar/user/:userId */
    PROJECT_CALENDAR_DATAS_BY_USER_ID_URL: `${CC_BACKEND_URL}/projects/calendar/user`,
    SC_PROJECT_CALENDAR_DATAS_BY_USER_ID_URL: `${SC_BACKEND_URL}/projects/calendar/user`,

    /** ${BACKEND_URL}/travels */
    /** ${BACKEND_URL}/travels/calendar/:userId/:month */
    /** ${BACKEND_URL}/travels/:userId/groups/year */
    TRAVEL_DATAS_URL: `${CC_BACKEND_URL}/travels`,
    SC_TRAVEL_DATAS_URL: `${SC_BACKEND_URL}/travels`,
    TRAVEL_CALENDAR_DATAS_URL: `${CC_BACKEND_URL}/travels/calendar`,
    SC_TRAVEL_CALENDAR_DATAS_URL: `${SC_BACKEND_URL}/travels/calendar`,

    /** /auth/signin */
    AUTH_SIGNIN: '/auth/signin',
};

export default CONSTANTS;
