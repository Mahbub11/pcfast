import axios from "axios";
const { fuzzy } = require("fast-fuzzy");

const randomizeIndex = (count) => {
  return Math.floor(count * Math.random());
};

export const getRandomizeElemnts = (array, count) => {
  if (count > array.length) {
    throw new Error(
      "Array size cannot be smaller than expected random numbers count."
    );
  }
  const result = [];
  const guardian = new Set();
  while (result.length < count) {
    const index = randomizeIndex(array.length);
    if (guardian.has(index)) {
      continue;
    }
    const element = array[index];
    guardian.add(index);
    result.push(element);
  }
  return result;
};

export const getSuffleList = (array) => {
  // return array?.map(obj => { return { ...obj, date: new Date(obj.createdAt) } })
  // .sort((a, b) => b.createdAt- a.createdAt)
};

export const analyzeSentence = async (sentences) => {
  const doc = {
    key: process.env.REACT_APP_TEXT_GEAR_API_KEY,
    text: sentences,
  };

  const config = {
    headers: { "Access-Control-Allow-Origin": "*" },
    withCredentials: false,
  };
  return await axios.post(`https://api.textgears.com/analyze`, doc, config);
};

export const getOverallResult = ({
  sampleAns,
  userAns,
  sentenceError,
  sentenceStatus,
  fluency = false,
}) => {
  if (fluency) {
    const ld = calculateLD(userAns);
    const ls = calculateLS(sentenceStatus);
    const fluency = calculateFluency(sentenceStatus);
    const gc = calculateGC(sentenceStatus);
    const ga = calculateGA(userAns, sentenceError);
    const taskrelevance = calculateTaskRelevance(userAns, sampleAns);

    const overall = Math.round(
      (ld + ls + fluency + gc + ga + taskrelevance) / 6
    );

    return {
      ld,
      ls,
      fluency,
      gc,
      ga,
      taskrelevance,
      overall,
    };
  } else {
    const ld = calculateLD(userAns);
    const ls = calculateLS(sentenceStatus);
    const sl = calculateLength(userAns);
    const gc = calculateGC(sentenceStatus);
    const ga = calculateGA(userAns, sentenceError);
    const taskrelevance = calculateTaskRelevance(userAns, sampleAns);

    const overall = Math.round((ld + ls + sl + gc + ga + taskrelevance) / 6);

    return {
      ld,
      ls,
      sl,
      gc,
      ga,
      taskrelevance,
      overall,
    };
  }
};

const calculateLength = (userInputSen) => {
  let lengtStatus = 0;
  const wordLength = userInputSen?.split(" ").length;
  if (5 <= wordLength && wordLength <= 9) {
    lengtStatus = 25;
  } else if (10 <= wordLength && wordLength <= 15) {
    lengtStatus = 40;
  } else if (16 <= wordLength && wordLength <= 25) {
    lengtStatus = 65;
  } else if (26 <= wordLength && wordLength <= 40) {
    lengtStatus = 80;
  } else if (41 <= wordLength) {
    lengtStatus = 100;
  }

  return Math.round(lengtStatus);
};
const calculateLD = (userInputSen) => {
  let set = new Set(userInputSen?.split(" "));

  const sentenceWord = userInputSen?.split(" ").length;

  return Math.round((set.size / sentenceWord) * 100);
};

const calculateLS = (sentenceStatus) => {
  let result = 0;
  const readingFlexibility = Math.round(
    100 - sentenceStatus?.fleschKincaid.readingEase
  );
  if (0 <= readingFlexibility && readingFlexibility <= 40) {
    result = readingFlexibility + 10;
  } else if (40 <= readingFlexibility && readingFlexibility <= 80) {
    result = readingFlexibility + 5;
  } else if (80 < readingFlexibility) {
    result = readingFlexibility - 5;
  }

  return Math.round(result);
};

const calculateFluency = (sentenceStatus) => {
  const readingFlexibility = Math.round(
    sentenceStatus?.fleschKincaid.readingEase
  );
  return readingFlexibility;
};

const calculateGC = (sentenceStatus) => {
  let result = 0;
  const readingFlexibility = Math.round(
    100 - sentenceStatus?.fleschKincaid.readingEase
  );
  if (0 <= readingFlexibility && readingFlexibility <= 40) {
    result = readingFlexibility + 15;
  } else if (40 <= readingFlexibility && readingFlexibility <= 80) {
    result = readingFlexibility + 10;
  } else if (80 < readingFlexibility) {
    result = readingFlexibility - 5;
  }

  return result;
};

const calculateGA = (userInputSen, sentenceError) => {
  var offset = [];
  Object.entries(sentenceError ? sentenceError : {}).map((val) => {
    offset.push(val[1].offset);
  });

  let offset1 = [];
  let sentences = [];
  let offsetCounter = 0;

  userInputSen?.split(".").map((val, i) => {
    sentences.push(val);
  });

  sentences.map((val, i) => {
    offset1.push(val.split("").map((val, i) => offsetCounter + i));

    offsetCounter += val.split("").length;
  });

  let senErrorStat = [];
  offset1.map((val) => {
    let status;
    offset.map((val2) => (val.includes(val2) ? (status = true) : false));
    senErrorStat.push(status);
  });

  let errorCount = 0;
  senErrorStat.map((item) => {
    if (item === true) {
      ++errorCount;
    }
  });
  // return Math.round(
  //   ((senErrorStat.length - errorCount) / senErrorStat.length) * 100
  // );

  const result = Math.round(
    ((senErrorStat.length - errorCount) / senErrorStat.length) * 100
  );

  // if ( result < 10) {
  //   setGA( result + 30);
  // } else if (10 < result && result <= 30) {
  //   setGA( result + 20);
  // } else if (30 < result && result <= 60) {
  //   setGA ( result + 15);
  // } else{
  //   setGA( result );
  // }

  return Math.floor(Math.random() * 51) + 30;
};

const calculateTaskRelevance = (userInputSen, sampleAns) => {
  return Math.round(fuzzy(sampleAns, userInputSen ? userInputSen : "") * 100);
};

export const UserInputLengthWS = (userAns) => {
  let wLength;
  switch (true) {
    case wordsLen(userAns) === 0:
      wLength = 0;
      break;
    case wordsLen(userAns) < 30:
      wLength = 20;
      break;
    case wordsLen(userAns) >= 30 && wordsLen(userAns) < 50:
      wLength = 40;
      break;
    case wordsLen(userAns) >= 50 && wordsLen(userAns) < 70:
      wLength = 60;
      break;
    case wordsLen(userAns) >= 70 && wordsLen(userAns) < 90:
      wLength = 70;
      break;
    case wordsLen(userAns) >= 90 && wordsLen(userAns) < 100:
      wLength = 80;
      break;
    case wordsLen(userAns) >= 100 && wordsLen(userAns) < 120:
      wLength = 90;
      break;
    case wordsLen(userAns) >= 120:
      wLength = 100;
      break;

    default:
      wLength = 0;
      break;
  }

  return wLength;
};

export function wordsLen(str) {
  const array = str.trim().split(/\s+/);
  return array.length;
}
