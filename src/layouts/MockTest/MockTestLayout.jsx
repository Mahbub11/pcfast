import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { getRandomizeElemnts, getSuffleList } from "../../utils/HelperFunction";
import {
  clearMockTestUserInput,
  saveFifthSectionQuestion,
  saveFirstSectionQuestion,
  saveForthSectionQuestion,
  saveMockData,
  saveSecondSectionQuestion,
  saveThirdSectionQuestion,
} from "../../redux/slices/mockTest";
import { getModuleData } from "../../redux/slices/auth";
import { getUserMockList } from "../../redux/slices/mockData";

const secondSectionPrepData = {
  inner_type: 101,
  time: 0.2,
  sectionTitle: "Interactive Reading",
  addiotionalData:
    "You will have 7 minutes to answer question about a reading passage.",
};
export default function MockTestLayout() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [moduleDataLoaded, setModuleDataLoaded] = useState(true);
  const { mockList } = useSelector((state) => state.mockData);
  const [mockListData, setMockListData] = useState([]);
  const [busy, isBusy] = useState(true);
  const [moduleLoad, setModuleLoad] = useState(false);
  const { listRC,listRF, listInteractive } = useSelector(
    (state) => state.getReadingList
  );
  const { list } = useSelector((state) => state.getVocList);
  const { listSAL, listSLS, listSAP, listSRS, listSS } = useSelector(
    (state) => state.getSpeakingList
  );
  const { listLLT, listLLR } = useSelector((state) => state.getListeningList);
  const { listWAP, listRTW, listWS } = useSelector(
    (state) => state.getWritingList
  );

  console.log(mockList)

  const [rcList, setRCList] = useState([]);
  const [rfList, setRFList] = useState([]);
  const [vocList, setVocList] = useState([]);
  const [salList, setSalList] = useState([]);
  const [lltList, setLltList] = useState([]);
  const [wapList, setWapList] = useState([]);

  // secondSection
  const [firstSection, setFirstSection] = useState([]);
  const [secondSection, setSecondSection] = useState([]);
  const [thirdSection, setThirdSection] = useState([]);
  const [forthSection, setForthSection] = useState([]);
  const [fifthSection, setFifthSection] = useState([]);

  // console.log(mockList[0].set[31])

  useEffect(() => {
    console.log('ddd')
    const mockIndex = id.split("-")[1];
    dispatch(getModuleData());
     dispatch(getUserMockList())
    setMockListData(
      mockList.filter((item) => {
        return item.index === parseInt(mockIndex);
      })
    );
    setModuleDataLoaded(false);
  }, [moduleDataLoaded]);

  console.log(mockList);

  const filterData = (dataList, mockSet) => {
    let list = [];
    mockSet.map((id) =>
      dataList.map((item) => {
        if (item.id === id) {
          list.push(item);
        }
      })
    );

    return list;
  };
  const filterDataSingle = (dataList, mockSet) => {
    let list = [];
    mockSet.map((id) =>
      dataList.map((item) => {
        if (item.id === id) {
          list.push(item);
        }
      })
    );

    return list[0];
  };

  useEffect(() => {
    if (!moduleDataLoaded) {
      // filterData(listRC,mockListData[0].set[31])
      setRCList(filterData(listRC, mockListData[0].set[31]));
      setRFList(filterData(listRF, mockListData[0].set[33]));
      setVocList(filterData(list, mockListData[0].set[11]));
      setSalList(filterData(listSAL, mockListData[0].set[41]));
      setLltList(filterData(listLLT, mockListData[0].set[51]));
      setWapList(filterData(listWAP, mockListData[0].set[21]));
      const getSuffleSection =
      vocList
        //     rcList
        //  .concat(rfList)
        // .concat(vocList)
        // .concat(salList)
        // .concat(lltList);

      const one = getSuffleSection[0];
      const one_new = getSuffleSection[20];
      const two = getSuffleSection[1];
      const three = getSuffleSection[2];
      const four = getSuffleSection[3];

      const five = getSuffleSection[4];
      const six = getSuffleSection[5];
      const seven = getSuffleSection[6];
      const eight = getSuffleSection[7];

      const nine = getSuffleSection[8];
      const ten = getSuffleSection[9];
      const eleven = getSuffleSection[10];
      const twelve = getSuffleSection[11];
      const thirteen = getSuffleSection[12];
      const forthen = getSuffleSection[13];

      const fiften = getSuffleSection[14];
      const sixten = getSuffleSection[15];
      const seventen = getSuffleSection[16];
      const eighten = getSuffleSection[17];
      const nintn = getSuffleSection[18];
      const twenty = getSuffleSection[19];

      const finalDataSectionOne = [
        one,
        one_new,
        eight,
        forthen,
        twenty,
        two,
        seven,
        thirteen,
        nintn,
        three,
        six,
        twelve,
        eighten,
        eleven,
        fiften,
        four,
        sixten,
        nine,
        five,
        seventen,
        ten,
      ];

      setFirstSection(getSuffleSection.concat(wapList));

      setSecondSection([
        secondSectionPrepData,
        filterDataSingle(listInteractive, mockListData[0].set[32]),
      ]);

      //set third section
      const randomlli = [filterData(listLLR, mockListData[0].set[52])];
      setThirdSection([
        randomlli[0][0],
        {
          name: "Summary Holder",
          type: 5,
          inner_type: 521,
          data: randomlli[0][0],
        },
      ]);

      //forth Section
      setForthSection([
        filterDataSingle(listRTW, mockListData[0].set[22]),
        filterDataSingle(listSLS, mockListData[0].set[44]),
        filterDataSingle(listSAP, mockListData[0].set[42]),
        filterDataSingle(listSRS, mockListData[0].set[43]),
      ]);

      // fifth section
      setFifthSection([
        filterDataSingle(listWS, mockListData[0].set[23]),
        filterDataSingle(listSS, mockListData[0].set[45]),
      ]);

      setModuleLoad(true);
    }
  }, [moduleLoad, moduleDataLoaded]);

  useEffect(() => {
    if (moduleLoad) {
      dispatch(saveMockData(mockListData));
      dispatch(saveFirstSectionQuestion(firstSection));
      // dispatch(saveSecondSectionQuestion(secondSection));
      // dispatch(saveThirdSectionQuestion(thirdSection));
      // dispatch(saveForthSectionQuestion(forthSection));
      // dispatch(saveFifthSectionQuestion(fifthSection));
      isBusy(false);
    }
  }, [busy, moduleLoad]);

  console.log(firstSection);

  return (
    <div className="w-full h-auto bg-[#eff2f69a]">
      <div className="">
        <div>
          {busy ? (
            <Skeleton></Skeleton>
          ) : (
            <div>
              <Outlet></Outlet>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
