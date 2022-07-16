import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";

const qualitiesSlice = createSlice({
  name: "qialities",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true;
    },
    qualitiesRecived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    qualitiesRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesRecived, qualitiesRequestFiled } = actions;

function isOutDated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }

  return false;
}

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  dispatch(qualitiesRequested());
  if (isOutDated(lastFetch)) {
    try {
      const { content } = await qualityService.get();
      dispatch(qualitiesRecived(content));
    } catch (error) {
      qualitiesRequestFiled(error.message);
    }
  }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getLoadingQualitiesState = () => (state) =>
  state.qualities.isLoading;
export const getQualityById = (id) => (state) =>
  state.qualities.entities.find((q) => q._id === id);

export default qualitiesReducer;
