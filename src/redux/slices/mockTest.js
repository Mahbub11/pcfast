import { createSlice, current } from "@reduxjs/toolkit";
import { ShowNotification } from "../actions";
import { API_LEVEL } from "../../config";
import axiosInstance from "../../utils/axios";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  firstSectionQuestions: [],
  secondSectionQuestions: [],
  thirdSectionQuestions: [],
  forthSectionQuestions: [],
  fifthSectionQuestions: [],
  mockTestUserAns: [],
  mockData: null,
};

const slice = createSlice({
  name: "mockTest",
  initialState,
  reducers: {
    setMockData: (state, action) => {
      state.mockData = action.payload;
    },
    setFirstSectionQuestions: (state, action) => {
      state.firstSectionQuestions = action.payload;
    },
    setSecondSectionQuestions: (state, action) => {
      state.secondSectionQuestions = action.payload;
    },
    setThirdSectionQuestions: (state, action) => {
      state.thirdSectionQuestions = action.payload;
    },
    setForthSectionQuestions: (state, action) => {
      state.forthSectionQuestions = action.payload;
    },
    setFifthSectionQuestions: (state, action) => {
      state.fifthSectionQuestions = action.payload;
    },
    setMockTestUserAns: (state, action) => {
      state.mockTestUserAns = [...state.mockTestUserAns, action.payload];
    },
    clearMockTestUserAns: (state, action) => {
      state.mockTestUserAns = [];
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const saveMockData = (questions) => async (dispatch) => {
  try {
    dispatch(slice.actions.setMockData(questions));
  } catch (error) {
    dispatch(
      ShowNotification({ severity: "error", message: "Mock Data Save Failed" })
    );
  }
};
export const saveFirstSectionQuestion = (questions) => async (dispatch) => {
  try {
    dispatch(slice.actions.setFirstSectionQuestions(questions));
  } catch (error) {
    dispatch(
      ShowNotification({
        severity: "error",
        message: "Mock Question Load Failed",
      })
    );
  }
};

export const saveSecondSectionQuestion = (questions) => async (dispatch) => {
  try {
    dispatch(slice.actions.setSecondSectionQuestions(questions));
  } catch (error) {
    dispatch(
      ShowNotification({
        severity: "error",
        message: "Mock Question Load Failed",
      })
    );
  }
};
export const saveThirdSectionQuestion = (questions) => async (dispatch) => {
  try {
    dispatch(slice.actions.setThirdSectionQuestions(questions));
  } catch (error) {
    dispatch(
      ShowNotification({
        severity: "error",
        message: "Mock Question Load Failed",
      })
    );
  }
};

export const saveForthSectionQuestion = (questions) => async (dispatch) => {
  try {
    dispatch(slice.actions.setForthSectionQuestions(questions));
  } catch (error) {
    dispatch(
      ShowNotification({
        severity: "error",
        message: "Mock Question Load Failed",
      })
    );
  }
};
export const saveFifthSectionQuestion = (questions) => async (dispatch) => {
  try {
    dispatch(slice.actions.setFifthSectionQuestions(questions));
  } catch (error) {
    dispatch(
      ShowNotification({
        severity: "error",
        message: "Mock Question Load Failed",
      })
    );
  }
};

export const saveMockTestUserAns = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.setMockTestUserAns(data));
  } catch (error) {
    dispatch(
      ShowNotification({
        severity: "error",
        message: "User Mock Test Data Saving Failed",
      })
    );
  }
};

export const clearMockTestUserInput = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.clearMockTestUserAns());
  } catch (error) {
    dispatch(
      ShowNotification({
        severity: "error",
        message: "User Mock Test Data Saving Failed",
      })
    );
  }
};

export const saveMockTestResult = (data) => async (dispatch) => {
  try {
    axiosInstance
      .post(`${API_LEVEL}/mocktest-result/save`, data)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
        dispatch(
          ShowNotification({
            severity: "error",
            message: "Result data Saving Failed",
          })
        );
      });
  } catch (error) {}
};
