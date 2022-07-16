import { createSlice, createAction } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import { generateAuthError } from "../utils/generaiteAuthError";
import history from "../utils/history";
import { randomInt } from "../utils/randomInt";

const initialState = localStorageService.getAccesToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersRecived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload;
    },
    authReaquestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authReaquestFaled: (state, action) => {
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLoggetOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdated: (state, action) => {
      const id = action.payload._id;
      if (id) {
        const currentUser = state.entities.find(
          (u) => u._id === action.payload._id
        );
        state.entities = state.entities.map(
          (u) => u._id !== action.payload._id
        );
        state.entities.push(currentUser);
      } else return null;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersRecived,
  usersRequestFiled,
  authReaquestSuccess,
  authReaquestFaled,
  userCreated,
  userLoggetOut,
  userUpdated
} = actions;

const authRequsted = createAction("users/authRequsted");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFiled = createAction("users/createUserFiled");
const userUpdateReq = createAction("users/userUpdateReq");
const updateuserFiled = createAction("users/updateuserFiled");

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());

  try {
    const { content } = await userService.get();
    dispatch(usersRecived(content));
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(usersRequestFiled(errorMessage));
    } else {
      dispatch(usersRequestFiled(error.message));
    }
  }
};

export const logIn =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequsted());
    try {
      const data = await authService.logIn({ email, password });
      dispatch(authReaquestSuccess({ userId: data.localId }));
      localStorageService.setTokens(data);
      history.push(redirect);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(usersRequestFiled(errorMessage));
      } else {
        dispatch(usersRequestFiled(error.message));
      }
    }
  };

export const updateUser = (data) => async (dispatch) => {
  dispatch(userUpdateReq());
  try {
    const { content } = await userService.updateUser(data);
    console.log(content);
    dispatch(userUpdated(content));
  } catch (error) {
    dispatch(updateuserFiled(error.message));
  }
};

export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequsted());
    try {
      const data = await authService.register({ email, password });
      localStorageService.setTokens(data);
      dispatch(authReaquestSuccess({ userId: data.localId }));
      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: randomInt(1, 5),
          completedMeetings: randomInt(0, 200),
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest
        })
      );
      history.push("/users");
    } catch (error) {
      dispatch(authReaquestFaled(error.message));
    }
  };

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(payload);
      dispatch(userCreated(content));
    } catch (error) {
      dispatch(createUserFiled(error.message));
    }
  };
}

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggetOut());
  history.push("/");
};

export const getUserById = (id) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === id);
  }
};

export const getCurrentUser = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null;
};

export const getUsers = () => (state) => state.users.entities;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getUsersStatus = () => (state) => state.users.isLoading;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getErrorMessage = () => (state) => state.users.error;

export default usersReducer;
