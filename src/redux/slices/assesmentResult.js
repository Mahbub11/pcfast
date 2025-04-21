import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  sentenceError: null,
  sentenceStatus: null,
  userInputSen: null,
  sentenceErrorTwo: null,
  sentenceStatusTwo: null,
  userInputSenTwo: null,
  showAssesmentLoading: false,
  showAssesmentLoadingTwo: false,
};

const slice = createSlice({
  name: "assesmentResult",
  initialState,
  reducers: {
    getResultRequest: (state, action) => {
      state.loading = true;
      state.showAssesmentLoading = true;
      state.showAssesmentLoadingTwo = true;

    },
    getResultRequestSuccess: (state, action) => {
      state.loading = false;
      state.showAssesmentLoading = false;
      state.sentenceError = action.payload.sentenceError;
      state.userInputSen = action.payload.userInputSen;
      state.sentenceStatus = action.payload.sentenceStatus;
    },
    getResultRequestSuccessTwo: (state, action) => {
      state.loading = false;
      state.showAssesmentLoadingTwo = false;
      state.sentenceErrorTwo = action.payload.sentenceError;
      state.userInputSenTwo = action.payload.userInputSen;
      state.sentenceStatusTwo = action.payload.sentenceStatus;
    },
    clearAssesmentResult: (state, action) => {
      state.loading = false;
      state.showAssesmentLoading = false;
      state.sentenceError = null;
      state.userInputSen = null;
      state.sentenceStatus = null;
      state.sentenceErrorTwo = null;
      state.userInputSenTwo = null;
      state.sentenceStatusTwo = null;
      state.showAssesmentLoadingTwo = false;
    },
    getResultRequestFailed: (state, action) => {
      state.loading = false;
      state.showAssesmentLoading = false;
      state.error = action.payload.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const getAssesmentResult = (sentences) => async (dispatch) => {
  try {
    dispatch(slice.actions.getResultRequest());

    const doc = {
      key: process.env.REACT_APP_TEXT_GEAR_API_KEY,
      text: sentences,
    };
    const config = {
      headers: { "Access-Control-Allow-Origin": "*" },
      withCredentials: false,
    };

    await axios
      .post(`https://api.textgears.com/analyze`, doc, config)
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.getResultRequestSuccess({
            sentenceError: response.data.response.grammar.errors,
            userInputSen: sentences,
            sentenceStatus: response.data.response.stats,
          })
        );
        //   I had a red cows once. I loves to played crickets
      })
      .catch((error) =>
        dispatch(
          slice.actions.getResultRequestFailed({
            error: error,
          })
        )
      );
  } catch (error) {
    slice.actions.getResultRequestFailed({
      error: error,
    });
  }
};

export const getSecondAssesmentResult = (sentences) => async (dispatch) => {
  try {
    dispatch(slice.actions.getResultRequest());

    const doc = {
      key: process.env.REACT_APP_TEXT_GEAR_API_KEY,
      text: sentences,
    };
    const config = {
      headers: { "Access-Control-Allow-Origin": "*" },
      withCredentials: false,
    };

    await axios
      .post(`https://api.textgears.com/analyze`, doc, config)
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.getResultRequestSuccessTwo({
            sentenceError: response.data.response.grammar.errors,
            userInputSen: sentences,
            sentenceStatus: response.data.response.stats,
          })
        );
        //   I had a red cows once. I loves to played crickets
      })
      .catch((error) =>
        dispatch(
          slice.actions.getResultRequestFailed({
            error: error,
          })
        )
      );
  } catch (error) {
    slice.actions.getResultRequestFailed({
      error: error,
    });
  }
};

export const clearAssesmentResult = (sentences) => async (dispatch) => {
  try {
    dispatch(slice.actions.getResultRequest());

    dispatch(slice.actions.clearAssesmentResult());
  } catch (error) {
    slice.actions.getResultRequestFailed({
      error: error,
    });
  }
};
