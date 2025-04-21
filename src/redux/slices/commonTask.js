import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import {
  CloseNotification,
  ForceBlurFalse,
  ShowNotification,
  ToggleBlury,
} from "../actions";
// import axios from "../../utils/axios";
import { API_LEVEL } from "../../config";
import axiosInstance from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  loading: true,
  error: null,
  status: null,
};

const slice = createSlice({
  name: "commonTask",
  initialState,
  reducers: {
    InitiateTask: (state, action) => {
      state.loading = true;
    },
    TaskSuccess: (state, action) => {
      state.loading = false;
      state.status = true;
    },
    TaskFailed: (state, action) => {
      state.loading = false;
      state.status = false;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:
export const sendContactUsEmail = (data) => async (dispatch) => {
  try {

    dispatch(slice.actions.InitiateTask());

    await axiosInstance
      .post(`${API_LEVEL}/common-task/contact-us`, data)
      .then((res) => {
        console.log('dd')
        dispatch(slice.actions.TaskSuccess());
        dispatch(ShowNotification({ severity: "success", message: 'Email sent !' }));
      })
      .catch((err) => {
        dispatch(slice.actions.TaskFailed());
        dispatch(ShowNotification({ severity: "error", message: 'Email sent Failed' }));
        console.error(err);
      });
  } catch (error) {
    dispatch(slice.actions.TaskFailed());
    dispatch(
      ShowNotification({ message: "Failed to send email", type: "error" })
    );
  }
};
