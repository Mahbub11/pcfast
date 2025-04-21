import { createSlice, current } from "@reduxjs/toolkit";
import { ShowNotification } from "../actions";
import { API_LEVEL } from "../../config";
import axiosInstance from "../../utils/axios";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  mockList: [],
  resultList: [],
};

const slice = createSlice({
  name: "mockData",
  initialState,
  reducers: {
    setMockListRequest: (state) => {
      state.loading = true;
    },
    setMockListRequestSuccess: (state, action) => {
      state.loading = false;
      state.mockList = action.payload.payload;
    },
    getMockListRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setMockResultSuccess: (state, action) => {
      state.loading = false;
      state.resultList = action.payload.payload;
      console.log(action.payload);
    },
    getMockResultFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const getUserMockResult = (id) => async (dispatch) => {
  try {
    axiosInstance
      .get(`${API_LEVEL}/mocktest-result/get-all/${id}`)
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.setMockResultSuccess({
            payload: response.data.list,
          })
        );
      })
      .catch((error) => {
        dispatch(
          slice.actions.getMockListRequestFail({
            payload: error,
          })
        );
      });
  } catch (error) {
    dispatch(
      slice.actions.getMockResultFail({
        payload: error,
      })
    );
  }
};
export const getUserMockList = (resultData) => async (dispatch) => {
  console.log(resultData);
  try {
    dispatch(slice.actions.setMockListRequest());

    axiosInstance
      .get(`${API_LEVEL}/mocktest-result/get-list`)
      .then((response) => {
        console.log(response.data);

        dispatch(
          slice.actions.setMockListRequestSuccess({
            payload: response.data.data
          })
        );
      })
      .catch((error) => {
        dispatch(
          slice.actions.getMockListRequestFail({
            payload: error,
          })
        );
      });
  } catch (error) {
    dispatch(
      slice.actions.getMockListRequestFail({
        payload: error,
      })
    );
  }
};
