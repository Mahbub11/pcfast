import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import axiosInstant from "../../utils/axios";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
import { ShowNotification } from "../actions";

// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  list: [],
  mockList: [],
  error: [],
};

const slice = createSlice({
  name: "Package",
  initialState,
  reducers: {
    setPackageRequest: (state) => {
      state.loading = true;
    },
    setPackageRequestSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload.payload;
    },
    getPackageRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setMockListRequest: (state) => {
      state.loading = true;
    },
    setMockListRequestSuccess: (state, action) => {
      state.loading = false;
      state.mockList = action.payload.payload.slice(0,3);
    },
    getMockListRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const getPackageRequest = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.setPackageRequest());

    axiosInstance
      .get(`${API_LEVEL}/package/get`)
      .then((response) => {
        dispatch(
          slice.actions.setPackageRequestSuccess({
            payload: response.data.data,
          })
        );
      })
      .catch((error) => {
        dispatch(
          slice.actions.getPackageRequestFail({
            payload: error,
          })
        );
      });
  } catch (error) {
    dispatch(
      slice.actions.getPackageRequestFail({
        payload: error,
      })
    );
  }
};

export const savePackage = (data) => async (dispatch) => {
  try {
    axiosInstance
      .post(`${API_LEVEL}/package/create`, data)
      .then((response) => {
        dispatch(
          ShowNotification({ severity: "success", message: "Package Saved!" })
        );
      })
      .catch((error) => {
        dispatch(
          ShowNotification({
            severity: "error",
            message: "Package Saving Failed!",
          })
        );
        console.log(error);
      });
  } catch (error) {
    dispatch(
      slice.actions.getPackageRequestFail({
        payload: error,
      })
    );
  }
};

export const deletePackage = (id) => async (dispatch) => {
  try {
    axiosInstance
      .delete(`${API_LEVEL}/package/delete/${id}`)
      .then((response) => {
        dispatch(
          ShowNotification({ severity: "success", message: "Package deleted" })
        );
      })
      .catch((error) => {
        dispatch(
          ShowNotification({
            severity: "error",
            message: "Package Delete Failed!",
          })
        );
        console.log(error);
      });
  } catch (error) {
    dispatch(
      slice.actions.getPackageRequestFail({
        payload: error,
      })
    );
  }
};

// mockList

export const getMockList = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.setMockListRequest());

    axiosInstance
      .get(`${API_LEVEL}/package/mock/getlist`)
      .then((response) => {
        console.log(response.data);

        dispatch(
          slice.actions.setMockListRequestSuccess({
            payload:response.data.data.sort((a, b) => a.id - b.id).map((val, index) => ({
              ...val,
              index: ++index,
            })),
          
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

export const saveMockSet = (data) => async (dispatch) => {
  try {
    axiosInstance
      .post(`${API_LEVEL}/package/mock/create`, data)
      .then((response) => {
        dispatch(
          ShowNotification({ severity: "success", message: "MockList Saved!" })
        );
      })
      .catch((error) => {
        dispatch(
          ShowNotification({
            severity: "error",
            message: "Mock data Saving Failed!",
          })
        );
        console.log(error);
      });
  } catch (error) {
    dispatch(
      slice.actions.getPackageRequestFail({
        payload: error,
      })
    );
  }
};
export const updateMockSet = (data) => async (dispatch) => {
  try {
    axiosInstance
      .put(`${API_LEVEL}/package/mock/update`, data)
      .then((response) => {
        dispatch(
          ShowNotification({ severity: "success", message: "MockList Saved!" })
        );
      })
      .catch((error) => {
        dispatch(
          ShowNotification({
            severity: "error",
            message: "Mock data Saving Failed!",
          })
        );
        console.log(error);
      });
  } catch (error) {
    dispatch(
      slice.actions.getPackageRequestFail({
        payload: error,
      })
    );
  }
};

export const deleteMockSet = (id) => async (dispatch) => {
  try {
    axiosInstance
      .delete(`${API_LEVEL}/package/mock/delete/${id}`)
      .then((response) => {
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Mock List deleted",
          })
        );
      })
      .catch((error) => {
        dispatch(
          ShowNotification({
            severity: "error",
            message: "MockList Delete Failed!",
          })
        );
        console.log(error);
      });
  } catch (error) {
    dispatch(
      slice.actions.getPackageRequestFail({
        payload: error,
      })
    );
  }
};
