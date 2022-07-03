import { createSlice } from "@reduxjs/toolkit";
import comentsService from "../services/coment.srvice";

const comentsSlice = createSlice({
  name: "coments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    comentsRequested: (state) => {
      state.isLoading = true;
    },
    comentsRecived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    comentsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = true;
    },
    comentCreate: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    comentDeleted: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    }
  }
});

const { reducer: comentsReducer, actions } = comentsSlice;
const {
  comentsRequested,
  comentsRecived,
  comentsRequestFiled,
  comentDeleted,
  comentCreate
} = actions;

export const loadcomentsList = (userId) => async (dispatch) => {
  dispatch(comentsRequested());
  try {
    const { content } = await comentsService.getComments(userId);
    dispatch(comentsRecived(content));
  } catch (error) {
    comentsRequestFiled(error.message);
  }
};

export const comentCreated = (data) => async (dispatch) => {
  try {
    const { content } = await comentsService.createComent(data);
    dispatch(comentCreate(content));
  } catch (error) {
    dispatch(comentsRequestFiled(error.message));
  }
};

export const comentRemoved = (id) => async (dispatch) => {
  try {
    await comentsService.removeComment(id);
    dispatch(comentDeleted(id));
  } catch (error) {
    dispatch(comentsRequestFiled(error.message));
  }
};

export const getcoments = () => (state) => state.coments.entities;
export const getLoadingcomentsStatus = () => (state) => state.coments.isLoading;

export default comentsReducer;
