import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { SYSTEM_MESSAGE } from "../../hooks/statCheckerPrompt";
import { SYSTEM_MESSAGE_G } from "../../hooks/grammarCheckerPrompt";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  loading: true,
  feedbackloading: true,
  followUpfeedbackloading: true,
  userInput: null,
  userInputFollowUp: null,
  errorList: [],
  errorListFollowUp: [],
  correctText: null,
  correctTextFollowUp: null,
  statistic: null,
  error: null,
  isSubscriptionRequired: false,
};

const slice = createSlice({
  name: "gptAssmentResult",
  initialState,
  reducers: {
    getResultRequest: (state, action) => {
      state.loading = true;
    },
    getFeedbackResultRequest: (state, action) => {
      state.feedbackloading = true;
      state.followUpfeedbackloading = true;
    },
    getResultRequestSuccess: (state, action) => {
      state.feedbackloading = false;
      state.userInput = action.payload.userInput;
      state.errorList = action.payload.errorList;
      state.correctText = action.payload.correctText;
    },
    getFollowUpResultRequestSuccess: (state, action) => {
      state.followUpfeedbackloading = false;
      state.userInputFollowUp = action.payload.userInput;
      state.errorListFollowUp = action.payload.errorList;
      state.correctTextFollowUp = action.payload.correctText;
    },
    getStatResultRequestSuccess: (state, action) => {
      state.loading = false;
      state.statistic = action.payload.statistic;
    },
    setIsSubsCriptionRequired: (state, action) => {
      state.loading = false;
      state.isSubscriptionRequired = true;
    },

    clearAssesmentResult: (state, action) => {
      state.loading = true;
      state.feedbackloading = true;
      state.userInput = null;
      state.errorList = [];
      state.correctText = null;
      state.statistic = null;
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

export const getFollowUpFeedbackResult = (message) => async (dispatch) => {
  try {
    //  dispatch(slice.actions.getFeedbackResultRequest());

    await axiosInstance
      .post(`${API_LEVEL}/ev/completion`, { message: message })
      .then((response) => {
        dispatch(
          slice.actions.getFollowUpResultRequestSuccess({
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

export const getStatResult = (message) => async (dispatch) => {
  try {
    dispatch(slice.actions.getResultRequest());

    await axiosInstance
      .post(`${API_LEVEL}/ev/stat`, { message: message })
      .then((response) => {
        dispatch(
          slice.actions.getStatResultRequestSuccess({
            statistic: response.data.stat,
          })
        );
      })

      .catch((error) => {
        if (parseInt(error.status) === 402) {
          dispatch(slice.actions.setIsSubsCriptionRequired());
        }
        console.log(error);
      });
  } catch (error) {}
};

export const clearGPTAssesmentResult = (messages) => async (dispatch) => {
  try {
    dispatch(slice.actions.clearAssesmentResult());
  } catch (error) {}
};
