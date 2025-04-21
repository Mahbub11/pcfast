import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  finalEvSetupState: true,
  error: null,
  evSetList: [],
  evStatList: [],

  partOneEvData: [],
  partOneStatData: [],

  partTwoEvData: [],
  partTwoStatData: [],

  partThreeEvData: [],
  partThreeStatData: [],

  overallStatData: {},
};

const slice = createSlice({
  name: "ielts_speakingEV",
  initialState,
  reducers: {
    getResultRequest: (state, action) => {
      state.loading = true;
    },
    setEvSetList: (state, action) => {
      state.loading = false;
      state.evSetList = [...state.evSetList, action.payload];
    },
    setStatSetList: (state, action) => {
      state.loading = false;
      state.evStatList = [...state.evStatList, action.payload];
    },
    setUpEvDataRequest: (state, action) => {
      state.finalEvSetupState = true;
    },
    setUpFinalEvData: (state, actions) => {

      state.partOneEvData = actions.payload.partOneEvData;
      state.partOneStatData = actions.payload.partOneStatData;

      state.partTwoEvData = actions.payload.partTwoEvData;
      state.partTwoStatData = actions.payload.partTwoStatData;

      state.partThreeEvData = actions.payload.partThreeEvData;
      state.partThreeStatData = actions.payload.partThreeStatData;

      state.overallStatData = actions.payload.overallStatData;

      state.finalEvSetupState = false;
    },
    clearEvSetListData: (state, action) => {
      state.evSetList = [];
      state.evStatList = [];
      state.partOneEvData = [];
      state.partOneStatData = [];

      state.partTwoEvData = [];
      state.partTwoStatData = [];

      state.partThreeEvData = [];
      state.partThreeStatData = [];

      state.overallStatData = [];
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

export const saveIeltsSpeakingAssByPart = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.getResultRequest());

    dispatch(slice.actions.setEvSetList(data));
  } catch (error) {
    slice.actions.getResultRequestFailed({
      error: error,
    });
  }
};
export const saveIeltsSpeakingStatByPart = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.getResultRequest());

    dispatch(slice.actions.setStatSetList(data));
  } catch (error) {
    slice.actions.getResultRequestFailed({
      error: error,
    });
  }
};

export const getSpeakingIeltsFinalEvResult =
  ({ evSetList, evStatList }) =>
  async (dispatch) => {
    try {
      dispatch(slice.actions.setUpEvDataRequest());

      const partOneStatData = evStatList.find((item) =>
        item.hasOwnProperty("1")
      )["1"];

      const partTwoStatData = evStatList.find((item) =>
        item.hasOwnProperty("2")
      )["2"];

      const partThreeStatData = evStatList.find((item) =>
        item.hasOwnProperty("3")
      )["3"];

      const partOneGrammarData = evSetList.find((item) =>
        item.hasOwnProperty("1")
      )["1"];
      const partTwoGrammarData = evSetList.find((item) =>
        item.hasOwnProperty("2")
      )["2"];

      const partThreeGrammarData = evSetList.find((item) =>
        item.hasOwnProperty("3")
      )["3"];

      const statResult = {
        Fluency_and_coherence: 0,
        Lexical_resource: 0,
        Grammatical_range_and_accuracy: 0,
        Pronunciation: 0,
      };

      evStatList.forEach((item) => {
        Object.keys(item).forEach((key) => {
          statResult.Fluency_and_coherence +=
            item[key][0].Fluency_and_coherence;
          statResult.Lexical_resource += item[key][1].Lexical_resource;
          statResult.Grammatical_range_and_accuracy +=
            item[key][2].Grammatical_range_and_accuracy;
          statResult.Pronunciation += item[key][3].Pronunciation;
        });
      });

      Object.keys(statResult).forEach((key) => {
        statResult[key] = Math.round(statResult[key] / evStatList.length);
      });

      statResult.overall = Math.round(
        (statResult.Fluency_and_coherence +
          statResult.Lexical_resource +
          statResult.Grammatical_range_and_accuracy +
          statResult.Pronunciation) /
          4
      );

      dispatch(
        slice.actions.setUpFinalEvData({
          partOneEvData: partOneGrammarData,
          partOneStatData: partOneStatData,
          partTwoEvData: partTwoGrammarData,
          partTwoStatData: partTwoStatData,
          partThreeEvData: partThreeGrammarData,
          partThreeStatData: partThreeStatData,
          overallStatData: statResult,
        })
      );
    } catch (error) {
      slice.actions.getResultRequestFailed({
        error: error,
      });
    }
  };

export const clearEvSetList = () => async (dispatch) => {
  try {
    dispatch(slice.actions.getResultRequest());

    dispatch(slice.actions.clearEvSetListData());
  } catch (error) {
    slice.actions.getResultRequestFailed({
      error: error,
    });
  }
};
