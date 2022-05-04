const PENDING = "pending"
const SUCCESS = "success"
const ERROR = "error"

export const loginUserPending = (state, action) => {
  console.log(state, action)
  console.log("state", state)
    console.log("action", action)
    setState(state, PENDING, {
      data: null,
      error: null,
      requestId: action.meta.requestId,
    });
  };
  
  export const loginUserFulfilled = (state, action) => {
    const { requestId } = action.meta;
    console.log("state", state)
    console.log("action", action)
    setState(state, SUCCESS, {
      data: action.payload,
      requestId: action.meta.requestId,
      error: null,
    });
  };
  
  export const loginUserRejected = (state, action) => {
    console.log(state, action)
    const { requestId } = action.meta;
    setState(state, ERROR, {
      data: action.payload,
      requestId: action.meta.requestId,
      error: action.error,
    });
  };
  
  export const getGithubAuthTokenPending = (state, action) => {
    setState(state, PENDING, {
      data: null,
      requestId: action.meta.requestId,
      error: null,
    });
  };
  
  export const getGithubAuthTokenFulfilled = (state, action) => {
    setState(state, SUCCESS, {
      data: action.payload,
      requestId: action.meta.requestId,
      error: null,
    });
  };
  
  export const getGithubAuthTokenRejected = (state, action) => {
    setState(state, ERROR, {
      data: action.payload,
      requestId: action.meta.requestId,
      error: null,
    });
  };
  
  const setState = (state, type, { data, requestId, error }) => {
    switch (type) {
      case PENDING:
        state.loading = true;
        state.error = null;
        state.data = null;
        state.currentRequestId = requestId;
      default:
        state.loading = false;
        state.error = error;
        state.data = data;
        state.currentRequestId = requestId;
    }
  };