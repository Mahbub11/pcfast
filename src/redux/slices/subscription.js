import { createSlice } from "@reduxjs/toolkit";
import { API_LEVEL } from "../../config";
import axiosInstance from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  error: null,
  subscription_type: null,
  ev_permissions: true,
  ev_question_attempt: 0,

  // proficiency:1  1= duolingo 2=ielts
};

const slice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    LoadRequest: (state) => {
      state.loading = true;
    },
    LoadRequestSuccess: (state, action) => {
      state.loading = false;
      state.subscription_type = action.payload.subscription_type;
      state.ev_permissions = action.payload.ev_permissions;
      state.ev_question_attempt = action.payload.ev_question_attempt;
    },
    LoadRequestFailed: (state, action) => {
      state.loading = false;
      state.subscription_type = null;
      state.ev_permissions = null;
      state.ev_question_attempt = null;
      state.error = action.payload;
    },
   
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:
export const setEvPermissionData = (data) => async (dispatch) => {
  try {

    dispatch(slice.actions.LoadRequest());
    dispatch(
      slice.actions.LoadRequestSuccess({
        subscription_type: data.subscription_type,
        ev_permissions: data.ev_question_attempt  >= 15 ? false:true, // if subscription_type true then ev permission true and if not check total attempt questions
        ev_question_attempt: data.ev_question_attempt,
      })
    );
    
  } catch (error) {}
};
