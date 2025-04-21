import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import appReducer from './slices/app';
import fillgap from './slices/fillgap';
import wordSelect from './slices/wordSelect';
import disctionary from './slices/disctionary';
import vocabulary from './adminslice/vocabulary'
import getVocList from './slices/getVocList'
import getReadingList from './slices/getReadingList'
import getWritingList from './slices/getWritingList'
import getSpeakingList from './slices/getSpeakingList';
import getListeningList from './slices/getListeningList';
import Speaking from './adminslice/Speaking';
import converSationHandler from './slices/converSationHandler';
import auth from './slices/auth';
import statistic from './slices/statistic';
import bookmark from './slices/bookmark';
import readingInput from './slices/readingInput';
import Reading from './adminslice/Reading';
import assesmentResult from './slices/assesmentResult';
import general from './slices/general';
import interactiveListening from './slices/interactiveListening';
import mockTest from './slices/mockTest';
import mockData from './slices/mockData';
import Package from './adminslice/Package';
import subscription from './slices/subscription';
import gptAssmentResult from './slices/gptAssmentResult';
import ielts_speaking from './adminslice/IELTS/ielts_speaking';
import ielts_speakingEV from './slices/IELTS/ielts_speakingEV';


// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  //   whitelist: [],
    blacklist: [],
};

const rootReducer = combineReducers({
  general:general,
  app: appReducer,
  auth:auth,
  readingInput:readingInput,
  fillgap:fillgap,
  assesmentResult:assesmentResult,
  wordSelect:wordSelect,
  disctionary:disctionary,
  vocabulary:vocabulary,
  getVocList:getVocList,
  getReadingList:getReadingList,
  Reading:Reading,
  getWritingList:getWritingList,
  getSpeakingList:getSpeakingList,
  getListeningList:getListeningList,
  speaking:Speaking,
  converSationHandler:converSationHandler,
  statistic:statistic,
  bookmark:bookmark,
  interactiveListening:interactiveListening,
  mockTest:mockTest,
  package:Package,
  mockData:mockData,
  subscription:subscription,
  gptAssmentResult:gptAssmentResult,
  ielts_speaking:ielts_speaking,
  ielts_speakingEV:ielts_speakingEV

 
  
});

export { rootPersistConfig, rootReducer };