import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  showAssesmentLoading: false,
};

const slice = createSlice({
  name: "interactiveListening",
  initialState,
  reducers: {
    getInteractiveRequest: (state, action) => {
      state.loading = true;
      state.showAssesmentLoading = true;
    },
    clearInteractiveResult: (state, action) => {
      state.loading = false;
      state.showAssesmentLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const getInteractiveResult = (sentences) => async (dispatch) => {
  dispatch(slice.actions.getInteractiveRequest());
};

export const clearInteractiveListeningResult =
  (sentences) => async (dispatch) => {
    dispatch(slice.actions.clearInteractiveResult());

   
  };
