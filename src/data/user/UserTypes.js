export const loginUserPending = (state, action) => {
  if (!state.loading) {
    setState(state, "pending", {
      data: null,
      error: null,
      requestId: action.meta.requestId,
    });
  }
};

export const loginUserFulfilled = (state, action) => {
  const { requestId } = action.meta;
  if (state.loading && state.currentRequestId === requestId) {
    setState(state, "success", {
      data: action.payload,
      requestId: action.meta.requestId,
      error: null,
    });
  }
};

export const loginUserRejected = (state, action) => {
  const { requestId } = action.meta;
  if (state.loading && state.currentRequestId === requestId) {
    setState(state, "success", {
      data: action.payload,
      requestId: action.meta.requestId,
      error: action.error,
    });
  }
};

export const getGithubAuthTokenPending = (state, action) => {
  if (!state.loading) {
    setState(state, "pending", {
      data: null,
      requestId: action.meta.requestId,
      error: null,
    });
  }
};

export const getGithubAuthTokenFulfilled = (state, action) => {
  setState(state, "success", {
    data: action.payload,
    requestId: action.meta.requestId,
    error: null,
  });
};

export const getGithubAuthTokenRejected = (state, action) => {
  setState(state, "success", {
    data: action.payload,
    requestId: action.meta.requestId,
    error: null,
  });
};

const setState = (state, type, { data, requestId, error }) => {
  switch (type) {
    case "pending":
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
