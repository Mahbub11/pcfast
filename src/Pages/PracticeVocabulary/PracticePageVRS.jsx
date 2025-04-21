import React, { useEffect, useState } from "react";
import { notification, Collapse, Skeleton } from "antd";
import { Statistic } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ToggleVisibility,
  DisableVisibility,
} from "../../redux/slices/fillgap";
import SingleWordChoice from "../../Components/Vocabulary/SingleWordChoice";
import { getWordDetails } from "../../redux/slices/disctionary";
import {
  CleanUserchoice,
  removeChecked,
  saveVocStatistic,
} from "../../redux/slices/wordSelect";
import IconCross from "../../Assets/SVG/IconCross";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { toggleBookmark } from "../../redux/slices/bookmark";
import WordChoiceSelect from "../../Components/Vocabulary/WordChoiceSelect";
import LoadingBubbleAnimation from "../../Assets/SVG/LoadingBubbleAnimation";
import IconBubble from "../../Assets/SVG/IconBubble";
import QuestionChangeLoadingScreen from "../../Components/QuestionChangeLoadingScreen";
const { Countdown } = Statistic;

export default function PracticePageVRS({ id, handleCloseModal }) {
  const [api, contextHolder] = notification.useNotification();
  const [timeDanger, setTimeDanger] = useState(false);
  const [busy, isBusy] = useState(true);
  const dispatch = useDispatch();
  let [vocData, setVocData] = useState({});
  let [vocIndex, setVocIndex] = useState(id);
  const [deadline, setDeadline] = useState(0);
  const { list } = useSelector((state) => state.getVocList);
  const { userChoice, error } = useSelector((state) => state.wordSelect);
  const { userInfo } = useSelector((state) => state.auth);
  const [bColor, setBcolor] = useState(true);
  const [showEv, setShowEv] = useState(false);
  const [showModelAns, setShowModelAns] = useState(false);
  const [pushNext, setpushNxt] = useState(false);
  const { rid } = useParams();
  const [evPageDelay,setEvPageDelay] = useState(true); 
  let [openPanels, setOpenPanels] = useState([]);
  let dataLength = list.length;

  const openNotification = () => {
    setpushNxt(true);
    // notification.open({
    //   message: `Times Up`,
    //   placement: "top",
    //   type: "warning",
    //   style: {
    //     border: "2px solid red",
    //   },
    // });
  };
  useEffect(() => {
    setVocIndex(id);
  }, [id]);

  useEffect(() => {
    if (id) {
      const data = list.filter((val, index) => vocIndex === val.index);
      setVocData(data[0]);
      setBcolor(data[0].bookmark);
    } else {
      const data = list.filter((val, index) => parseInt(rid) === val.id);
      setBcolor(data[0].bookmark);
      setVocData(data[0]);
    }

    setTimeout(()=>{
      isBusy(false);
    },1000)
    // setDeadline(Date.now() + 0.1 * 60000);
    dispatch(DisableVisibility());
    dispatch(CleanUserchoice());
  }, [vocData, vocIndex, busy, id]);

  const handleNext = () => {
    if (vocIndex <= --dataLength) {
      isBusy(true);
      setShowEv(false);
      setVocIndex(++vocIndex);
      dispatch(removeChecked());
      setShowModelAns(false);
      setEvPageDelay(true)
    }
  };
  const handlePrev = () => {
    if (vocIndex > 1) {
      isBusy(true);
      setShowEv(false);
      setVocIndex(--vocIndex);
      dispatch(removeChecked());
      setShowModelAns(false);
      setEvPageDelay(true)
    }
  };

  const handleEvaluate = () => {
    dispatch(ToggleVisibility());
    setShowModelAns(true);
    const correctResult = vocData.qa.a.filter((element) =>
      userChoice.includes(element)
    );
    const ansLength = vocData.qa.a.length;

    const statData = {
      user: userInfo.id,
      qn: vocData.id,
      level: vocData.level,
      type: vocData.type,
      inner_type: vocData.inner_type,
      time: vocData.time,
      result: ((correctResult.length / ansLength) * 100).toFixed(2),
    };

    setDeadline(null);
    setOpenPanels(["1"]);
    dispatch(saveVocStatistic(statData));
    setEvPageDelay(true)
    // dispatch(CleanUserchoice());
  };
  const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
  };

  const handleRetry = () => {
    setEvPageDelay(true)
    isBusy(true);
    setShowEv(false);
    setShowModelAns(false);
    dispatch(removeChecked());
    setDeadline(Date.now() + 0.1 * 60000);
    dispatch(DisableVisibility());
  };
  const handleBookmark = (id, type, inner_type) => {
    setBcolor(!bColor);
    const data = {
      id,
      type,
      inner_type,
    };
    dispatch(toggleBookmark(data));
  };

  const closeModalWindow = () => {
    setShowModelAns(false);

    setDeadline(0);
    setShowEv(false);
    dispatch(CleanUserchoice());
    dispatch(removeChecked());
    dispatch(DisableVisibility());
    isBusy(true)
    setEvPageDelay(true)
    setVocData(null)
    handleCloseModal();
  };

  const setCustomDeadline = (time) => {
    setDeadline(Date.now() + time * 60000);
    setpushNxt(false);
  };

  const setShowEvResult = () => {
    setShowEv(true);
    setTimeout(()=>{
      setEvPageDelay(false)
    },2000)
    
    handleEvaluate();
  };

  return (
    <div>
      {busy ? (
        <div className="w-full h-[30rem] flex justify-center m-auto sm:px-5 sm:py-10">
          {" "}
         {/* <IconBubble    width="5rem"
            height="5rem"
            fill="blue"></IconBubble> */}
          {/* <LoadingBubbleAnimation
            width="5rem"
            height="5rem"
            fill="blue"
            stroke='red'
          ></LoadingBubbleAnimation> */}
          <Skeleton active></Skeleton>
          {/* <QuestionChangeLoadingScreen></QuestionChangeLoadingScreen> */}
        </div>
      ) : (
        <div className="h-auto sm:w-full md:w-[99%] m-auto bg-[#fffffff7] md:px-5 md:py-5 ">
          <div
            onClick={closeModalWindow}
            className="absolute right-0 mr-3  sm:mt-[10px] md:mt-[-25px] cursor-pointer"
          >
            <span>
              <IconCross height="1rem" width="1rem"></IconCross>
            </span>
          </div>
          <div className="flex flex-col md:gap-5 sm:gap-2">
            {/* <h1 className="text-[22px] font-montserrat font-[500] underline self-center">
              Read and Select
            </h1> */}
            <div className="md:flex md:flex-row sm:flex sm:flex-col justify-between m-auto w-full mt-5">
              <div className="flex m-auto w-full md:mt-0 sm:mt-5">
                <div className="self-start">
                  <div className="flex justify-start md:gap-4 sm:gap-2 sm:text-[13px] font-[400] sm:ml-3 md:ml-0">
                    <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                      {vocData.level === 1
                        ? "Easy"
                        : vocData.level === 2
                        ? "Medium "
                        : "Hard"}
                    </p>
                    <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                      Practice: {vocData.practice}
                    </p>
                    <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                      Total Attempt: {vocData.total_tested}
                    </p>
                  </div>
                </div>
                <div
                  className="cursor-pointer px-2 py-2 ml-3 md:mt-[2px] sm:mt-[1px]"
                  onClick={() =>
                    handleBookmark(vocData.id, vocData.type, vocData.inner_type)
                  }
                >
                  {bColor ? (
                    <StarFilled
                      style={{ fontSize: "20px", color: "#08c" }}
                    ></StarFilled>
                  ) : (
                    <StarOutlined
                      style={{ fontSize: "20px", color: "#08c" }}
                    ></StarOutlined>
                  )}
                </div>
              </div>

              <div
                className="ml-1 font-[700] text-[20px] bg-[#DDE9F8] w-min px-2 py-1
                rounded-md md:relative sm:fixed sm:right-0 sm:mt-[15%] md:mt-0"
              >
                <Countdown
                  onChange={(e) => (e <= 60000 ? setTimeDanger(true) : "")}
                  valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
                  onFinish={openNotification}
                  value={deadline}
                  format="mm:ss"
                />
              </div>
            </div>
            <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins md:mt-5 sm:mt-10">
              {showEv ? "Evaluation Result" : "Is this a real English word?"}
            </h1>

            {showEv ? (
              evPageDelay ?
             <div className="w-[50%]  px-5 py-5 m-auto">
               <Skeleton active></Skeleton>
             </div>:

              <div>
                <SingleWordChoice data={vocData?.qa}></SingleWordChoice>
              </div>
            ) : (
              <div>
                <WordChoiceSelect
                  pushNext={pushNext}
                  setDeadline={setCustomDeadline}
                  words={vocData?.qa?.q}
                  setShowEvResult={setShowEvResult}
                ></WordChoiceSelect>
              </div>
            )}

            <div className="flex gap-5 justify-center mt-[3rem] font-poppins font-[500] sm:text-[12px] md:text-[15px]">
              <button
                onClick={handleRetry}
                className={`${
                  showEv ? "block" : "hidden"
                } bg-[#DDE9F8]  px-6 py-3 rounded-md drop-shadow-sm`}
              >
                Retry
              </button>
              {/* <button
                onClick={handleEvaluate}
                className="bg-[#DDE9F8]  px-6 py-3 rounded-md  drop-shadow-sm"
              >
                Evaluate
              </button> */}
            </div>

            <div className="mr-3">
              <div className="flex gap-2 justify-center m-auto w-min">
                <span
                  onClick={handlePrev}
                  className="m-auto w-min cursor-pointer"
                >
                  {" "}
                  <IconsArrowLeft width="1rem" height="1rem"></IconsArrowLeft>
                </span>
                <h1 className="border-[2px] text-[20px] font-[600] border-[#3AB7BF] px-2 py-2 rounded-md">
                  {vocIndex}
                </h1>
                <span
                  onClick={handleNext}
                  className="m-auto w-min cursor-pointer"
                >
                  {" "}
                  <IconsArrowRight width="1rem" height="1rem"></IconsArrowRight>
                </span>
              </div>
            </div>

            <div className={`${showModelAns ? "block" : "hidden"}`}>
              <div className="h-auto w-[95%] m-auto">
                <Collapse
                  accordion
                  style={{ backgroundColor: "#DDE9F8" }}
                  onChange={setOpenPanels}
                  activeKey={openPanels}
                  items={[
                    {
                      key: "1",
                      label: "Model Answer",
                      children: (
                        <p className=" text-[17px] font-poppins h-auto px-1">
                          {vocData.qa["a"].map((val) => (
                            <span
                              className="cursor-pointer md:hover:text-blue-500 w-full "
                              onClick={handleMeaning}
                            >
                              {val + "  "}
                            </span>
                          ))}
                        </p>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
