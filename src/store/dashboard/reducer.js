import { GET_DASHBOARD_STATS, GET_DASHBOARD_STATS_SUCCESS, GET_DASHBOARD_STATS_FAILURE } from './types';

const initialState = {
  loading: false,
  clients: 0,
  users: 0,
  transactions: 0,
};

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case GET_DASHBOARD_STATS:
      return {
        ...state,
        loading: true,
      };
    case GET_DASHBOARD_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        clients: payload.clients,
        users: payload.users,
        transactions: payload.transactions,
      };
    case GET_DASHBOARD_STATS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
