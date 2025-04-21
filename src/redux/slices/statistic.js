import { createSlice, current } from "@reduxjs/toolkit";
import { API_LEVEL } from "../../config";
// import { dispatch } from "../store";
import axiosInstance from "../../utils/axios";
import { ShowNotification } from "../actions";
import { scoreAvg, statAvg, statAvgSubScore, statAvgSubScoreLength } from "./statHelper";

// ----------------------------------------------------------------------

const initialState = {
  statData: [],
  error: null,
  loading: false,
  statReading: [],
  statWriting: [],
  statVocabulary: [],
  statSpeaking: [],
  statListening: [],

  statLiteracy:[],
  statComprension:[],
  statProduction:[],
  statConversation:[],

  statAvgScore:0,
  statRC:0,
  statRS:0,
  statRI:0,
  statWAP:0,
  statWRTW:0,
  statWS:0,
  statSAP:0,
  statSAL:0,
  statSRS:0,
  statSLS:0,
  statSS:0,
  statLLT:0,
  statLI:0,

  statRCL:0,
  statRSL:0,
  statRIL:0,
  statWAPL:0,
  statWRTWL:0,
  statWSL:0,
  statSAPL:0,
  statSALL:0,
  statSRSL:0,
  statSLSL:0,
  statSSL:0,
  statLLTL:0,
  statLIL:0



};

const slice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    SaveStatDataFailed: (state, action) => {
      state.error = action.payload;
    },
    ClearStatError: (state, action) => {
      state.error = null;
    },
    RequestStatData: (state, action) => {
      state.loading = true;
    },
    RequestStatDataSuccess: (state, action) => {
      state.loading = false;
      state.statData = action.payload.payload;
      // state.statAvgScore= statAvg((action.payload.payload))
    },
    setOverallScore: (state, action) => {
      state.loading = false;
      state.statAvgScore= scoreAvg({
        l:current(state.statLiteracy),
        c:current(state.statComprension),
        p:current(state.statProduction),
        comp:current(state.statComprension)
      })
    
    },
    SavingReadingList: (state, action) => {
      state.statReading = action.payload.payload;
      state.statRC=statAvgSubScore(action.payload.payload,31)
      state.statRI=statAvgSubScore(action.payload.payload,32)

      state.statRCL=statAvgSubScoreLength(action.payload.payload,31)
      state.statRIL=statAvgSubScoreLength(action.payload.payload,32)
    },
    SavingWritingList: (state, action) => {
      state.statWriting = action.payload.payload;
      state.statWAP=statAvgSubScore(action.payload.payload,21)
      state.statWRTW=statAvgSubScore(action.payload.payload,22)
      state.statWS=statAvgSubScore(action.payload.payload,23)

      state.statWAPL=statAvgSubScoreLength(action.payload.payload,21)
      state.statWRTWL=statAvgSubScoreLength(action.payload.payload,22)
      state.statWSL=statAvgSubScoreLength(action.payload.payload,23)

      
    },
    SavingSpeakingList: (state, action) => {
      state.statSpeaking = action.payload.payload;
      state.statSAL=statAvgSubScore(action.payload.payload,41)
      state.statSAP=statAvgSubScore(action.payload.payload,42)
      state.statSRS=statAvgSubScore(action.payload.payload,43)
      state.statSLS=statAvgSubScore(action.payload.payload,44)
      state.statSS=statAvgSubScore(action.payload.payload,45)

      state.statSALL=statAvgSubScoreLength(action.payload.payload,41)
      state.statSAPL=statAvgSubScoreLength(action.payload.payload,42)
      state.statSRSL=statAvgSubScoreLength(action.payload.payload,43)
      state.statSLSL=statAvgSubScoreLength(action.payload.payload,44)
      state.statSSL=statAvgSubScoreLength(action.payload.payload,45)
    },
    SavingListeningList: (state, action) => {
      state.statListening = action.payload.payload;
      state.statLLT=statAvgSubScore(action.payload.payload,51)
      state.statLI=statAvgSubScore(action.payload.payload,52)

      state.statLLTL=statAvgSubScoreLength(action.payload.payload,51)
      state.statLIL=statAvgSubScoreLength(action.payload.payload,52)
    },
    SavingVocList: (state, action) => {

      console.log(action.payload.payload)
      state.statVocabulary = action.payload.payload;
      state.statRS=statAvgSubScore(action.payload.payload,11)
      state.statRSL=statAvgSubScoreLength(action.payload.payload,11)
    },

    SavingLiteracyList: (state, action) => {
      state.statLiteracy = action.payload.payload;
    },
    SavingComperensionList: (state, action) => {
      state.statComprension = action.payload.payload;
    },
    SavingProductionList: (state, action) => {
      state.statProduction = action.payload.payload;
    },
    SavingConversationList: (state, action) => {
      state.statConversation = action.payload.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:
export const saveStatData = (data) => async (dispatch) => {
  try {
    axiosInstance
      .post(`${API_LEVEL}/profile/save-stat-duolingo`, data)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
        dispatch(ShowNotification({severity:'error',message:'Statistic data Saving Failed'}))
       
      });
  } catch (error) {}
};

export const clearStatDataError = (data) => async (dispatch) => {
  dispatch(slice.actions.ClearStatError());
};

export const getStatDuolingo = (data) => async (dispatch) => {
  dispatch(slice.actions.RequestStatData());

  try {
    axiosInstance
      .get(`${API_LEVEL}/profile/get-statd`)
      .then((response) => {
        const voc = response.data.list.filter((val) => val.type === 1);
        const reading = response.data.list.filter((val) => val.type === 3);
        const writing = response.data.list.filter((val) => val.type === 2);
        const listening = response.data.list.filter((val) => val.type === 5);
        const speaking = response.data.list.filter((val) => val.type === 4);

        const literacy = response.data.list.filter((val) => val.type === 1 ||  val.type === 2 ||  val.type === 3);
        const comprehension = response.data.list.filter((val) => val.type === 1 ||  val.type === 3 ||  val.type === 5);
        const production = response.data.list.filter((val) => val.type === 2 ||  val.type === 4);
        const conversation = response.data.list.filter((val) => val.type === 4 ||  val.type === 5);
 
        
    
        dispatch(
          slice.actions.RequestStatDataSuccess({
            payload: response.data.list,
          })
        );
        dispatch(
          slice.actions.SavingVocList({
            payload: voc.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            ),
          })
        );
        dispatch(
          slice.actions.SavingReadingList({
            payload: reading.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            ),
          })
        );
        dispatch(
          slice.actions.SavingWritingList({
            payload: writing.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            ),
          })
        );
        dispatch(
          slice.actions.SavingListeningList({
            payload: listening.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            ),
          })
        );
        dispatch(
          slice.actions.SavingSpeakingList({
            payload: speaking.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            ),
          })
        );


        dispatch(
          slice.actions.SavingLiteracyList({
            payload: literacy.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            ),
          })
        );
        dispatch(
          slice.actions.SavingComperensionList({
            payload:comprehension.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            ),
          })
        );
        dispatch(
          slice.actions.SavingProductionList({
            payload: production.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            ),
          })
        );
        dispatch(
          slice.actions.SavingConversationList({
            payload:conversation.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            ),
          })
        );
        dispatch(
          slice.actions.setOverallScore()
        );
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
