import { createSlice, current } from "@reduxjs/toolkit";
import { ShowNotification } from "../actions";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  notificationState: false,
  isModalOpen: false,
  feedBackList:null
};

const slice = createSlice({
  name: "general",
  initialState,
  reducers: {
    destroyNotification: (state, action) => {
      state.notificationState = false;
    },
    initNotification: (state, action) => {
      if (state.isModalOpen) {
        state.notificationState = true;
      }
    },
    modalViewClose: (state, action) => {
      state.isModalOpen = false;
    },
    modalViewOpen: (state, action) => {
      state.isModalOpen = true;
    },
    setFeedBackList: (state, action) => {
      state.feedBackList = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const destroyNotificationState = (sentences) => async (dispatch) => {
  try {
    dispatch(slice.actions.destroyNotification());
  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};

export const setNotification = (sentences) => async (dispatch) => {
  try {
    dispatch(slice.actions.initNotification());
  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};

export const closeModalActivity = (sentences) => async (dispatch) => {
  try {
    dispatch(slice.actions.modalViewClose());
  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};
export const openModal = (sentences) => async (dispatch) => {
  try {
    dispatch(slice.actions.modalViewOpen());
  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};
export const saveFeedback = (feedback) => async (dispatch) => {

  axiosInstance
    .post(`${API_LEVEL}/profile/save-feedback`, feedback)
    .then((response) => {
      dispatch(
        ShowNotification({ severity: "success", message: "Feedback Submitted!" })
      );
     
    })
    .catch((error) => {
      dispatch(
        ShowNotification({ severity: "error", message: "Feedback saving Failed" })
      );
      console.log(error);
    });
};
export const getFeedback = (feedback) => async (dispatch) => {

  axiosInstance
    .get(`${API_LEVEL}/profile/get-feedback`, feedback)
    .then((response) => {
     
      dispatch(
        slice.actions.setFeedBackList(response.data.data)
      );
     
    })
    .catch((error) => {
      dispatch(
        ShowNotification({ severity: "error", message: "Feedback saving Failed" })
      );
      console.log(error);
    });
};