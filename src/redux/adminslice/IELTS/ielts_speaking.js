import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";
import { API_LEVEL } from "../../../config";
import { ShowNotification } from "../../actions";


// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  error: [],
  list: [],
};

const slice = createSlice({
  name: "ielts_speaking",
  initialState,
  reducers: {
    SaveRequest: (state) => {
      state.loading = true;
    },
    SaveRequestSuccess: (state, action) => {
      state.loading = false;
    },
    LoadReadingRequestSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload.payload;
    },
    SaveRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const IeltsSaveSpeaking = (data) => async (dispatch) => {
  try {
    axiosInstance
      .post(`${API_LEVEL}/ielts/module/speaking/create`, data)
      .then((response) => {
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Saved Successfully",
          })
        );
        console.log(response);
      })
      .catch((error) => {
        dispatch(
          ShowNotification({ severity: "error", message: "We have an error" })
        );
        console.log(error);
      });
  } catch (error) {}
};

export const IeltsUpdatSpeaking = (data) => async (dispatch) => {
  try {
    console.log(data);
    axiosInstance
      .put(`${API_LEVEL}/module/speaking/update`, data)
      .then((response) => {
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Updated Successfully",
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          ShowNotification({ severity: "error", message: "We have an error" })
        );
      });
  } catch (error) {}
};

export const IeltsgetListOfSpeaking = (data, statData) => async (dispatch) => {
  try {
    dispatch(slice.actions.SaveRequest());

    axiosInstance
      .get(`${API_LEVEL}/ielts/module/speaking/get-all`)
      .then((response) => {
        dispatch(
          slice.actions.LoadReadingRequestSuccess({
            payload: response.data.data.sort((a, b) => a.id - b.id).map((val, index) => ({
              ...val,
              index: ++index,
              bookmark: data.find((item)=>item.qNo === val.id),
              practice:statData.filter(item=> parseInt(item.qn) === val.id).length
            })),
          })
        );
      })

      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch(
      slice.actions.SaveRequestFail({
        payload: error,
      })
    );
    // dispatch( ShowsnackBar({ severity: "error", message: error.message }))

    console.log(error);
  }
};
