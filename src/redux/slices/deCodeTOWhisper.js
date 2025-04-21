import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { WHISPER_API_URL } from "../../config";

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  decodeFile: null,
  audioFile: null,
  loading: true,
};

const slice = createSlice({
  name: "deCodeTOWhisper",
  initialState,
  reducers: {
    LoadRequest: (state) => {
      state.loading = true;
    },

    LoadRequestSuccess: (state, action) => {
      state.loading = !state.loading;
      state.decodeFile = action.payload.payload;
      state.audioFile = action.payload.payload;
    },
    LoadRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const sendToWhisper = (data) => async (dispatch) => {
  const { audioData, formData } = data;
  dispatch(slice.actions.LoadRequest());
  const apiKey = import.meta.env.OPEN_AI_WHISPER_API_KEY;

  try {
    await axios
      .post(
        WHISPER_API_URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        dispatch(
          slice.actions.LoadRequestSuccess({
            decodeFile: res.data,
            audioFile: audioData,
          })
        );
      })
      .catch((err) => {});

    dispatch(
      slice.actions.LoadRequestSuccess({
        payload: data,
      })
    );
  } catch (error) {
    dispatch(slice.actions.LoadRequestFailed);
    // dispatch( ShowsnackBar({ severity: "error", message: error.message }))

    console.log(error);
  }
};

export const clearOptions = (data) => async (dispatch) => {
  try {
    dispatch(
      slice.actions.ClearGapFill({
        payload: data,
      })
    );
  } catch (error) {}
};
