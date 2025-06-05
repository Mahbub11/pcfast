import { createSlice, current } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";

const initialState = {
  loading: true,
  feedbackloading: true,
  userInput: null,
  errorList: [],
  error: null,
};

const slice = createSlice({
  name: "gptAssmesmentSAL",
  initialState,
  reducers: {
    getResultRequest: (state, action) => {
      state.loading = true;
    },
    getFeedbackResultRequest: (state, action) => {
      state.feedbackloading = true;
    },
    getResultRequestSuccess: (state, action) => {
      state.feedbackloading = false;
      state.userInput = action.payload.userInput;
      state.errorList = action.payload.errorList;
    },
    clearAssesmentResult: (state, action) => {
      state.loading = true;
      state.feedbackloading = true;
      state.userInput = null;
      state.errorList = [];
    },
    getResultRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const getFeedbackResult = (message) => async (dispatch) => {
  try {
    dispatch(slice.actions.getFeedbackResultRequest());

    await axiosInstance
      .post(`${API_LEVEL}/ev/completion`, { message: message })
      .then((response) => {
        dispatch(
          slice.actions.getResultRequestSuccess({
            errorList: response.data.errorList,
            userInput: message,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    slice.actions.getResultRequestFailed({
      error: error,
    });
  }
};

export const clearGPTAssesmentResult = (messages) => async (dispatch) => {
  try {
    dispatch(slice.actions.clearAssesmentResult());
  } catch (error) {}
};
