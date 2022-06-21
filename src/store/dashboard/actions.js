import { GET_DASHBOARD_STATS, GET_DASHBOARD_STATS_SUCCESS, GET_DASHBOARD_STATS_FAILURE } from './types';
import url from '../../config/url';

export const getDashboardStats = (accessToken) => async (dispatch) => {
  let responseStatusCode = 0;
  try {
    dispatch({
      type: GET_DASHBOARD_STATS,
    });
    const response = await fetch(`${url}/api/dashboard/get_stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    responseStatusCode = response.status;
    const responseJson = await response.json();
    if (responseStatusCode === 200) {
      return dispatch({
        type: GET_DASHBOARD_STATS_SUCCESS,
        payload: responseJson.data,
      });
    }
    return dispatch({
      type: GET_DASHBOARD_STATS_FAILURE,
      payload: responseJson.message,
    });
  } catch (error) {
    return dispatch({
      type: GET_DASHBOARD_STATS_FAILURE,
      message: new Error(error).message,
    });
  }
};
