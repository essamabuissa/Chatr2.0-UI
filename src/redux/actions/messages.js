import instance from "./instance";
import { SET_MESSAGES } from "./actionTypes";

export const fetchMessages = () => async dispatch => {
  try {
    const response = await instance.get(`/channels/:channelID/`);
    const messages = response.data;
    dispatch({ type: SET_MESSAGES, payload: messages });
  } catch (error) {
    console.error(error.response.data);
  }
};

/**
 * Don't commit "dead" code
 */

// export const postMessages = newMessage => async dispatch => {
//   try {
//     await instance.post(`/channels/${channelID}/post`, newMessage);
//   } catch (error) {
//     console.error(error);
//     console.error(error.response.data);
//   }
// };
