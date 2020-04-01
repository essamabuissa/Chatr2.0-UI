import { SET_CHANNEL, ADD_CHANNEL, SET_MESSAGES } from "../actions/actionTypes";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHANNEL:
      const channels = action.payload;
      return channels;

    case ADD_CHANNEL:
      const newChannel = action.payload;
      return [newChannel, ...state];

    /**
     * This case would erase your entire list of channels
     * Messages should be a separate reducer
     * OR
     * This reducer needs to become an object with `channels` and `messages`
     */
    case SET_MESSAGES:
      const messages = action.payload;
      return messages;

    default:
      return state;
  }
};

export default reducer;
