import React, { useEffect, useRef, useState } from "react";
import { Input, Skeleton } from "antd";
import { Tag, Button, notification, Collapse, Grid } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Statistic } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getWordDetails } from "../../redux/slices/disctionary";
import {
  DisableVisibility,
  ToggleVisibility,
} from "../../redux/slices/fillgap";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import { clearStatDataError, saveStatData } from "../../redux/slices/statistic";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { toggleBookmark } from "../../redux/slices/bookmark";
import IconCross from "../../Assets/SVG/IconCross";
import { ShowNotification } from "../../redux/actions";
import {
  clearAssesmentResult,
  getAssesmentResult,
  getSecondAssesmentResult,
} from "../../redux/slices/assesmentResult";
import AssmentContainer from "../../Components/Assesment/AssmentContainer";
import AssmentContainerStepTwo from "../../Components/Assesment/AssmentContainerStepTwo";
import {
  clearGPTAssesmentResult,
  getStatResult,
} from "../../redux/slices/gptAssmentResult";
import { wordsLen } from "../../utils/HelperFunction";
import { AssesmentContainer } from "../../Components/AssesmentGPT/AssesmentContainer";
import { AssesmentContainerIW } from "../../Components/AssesmentGPT/AssesmentContainerIW";

const { TextArea } = Input;
const { Countdown } = Statistic;
const { useBreakpoint } = Grid;

export default function PracticePageRTW({ id, handleCloseModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [play, setPlay] = useState(true);
  const [timeDanger, setTimeDanger] = useState(false);
  const [busy, isBusy] = useState(true);
  const { rid } = useParams();
  let [index, setIndex] = useState(rid);
  const { state } = useLocation();
  let [data, setData] = useState({});
  const [bColor, setBcolor] = useState(true);
  const [deadline, setDeadline] = useState(0);
  const [secondDeadline, setSecondDeadline] = useState(0);
  const [xmTime, setxmTime] = useState(null);
  const [userAns, setUserAns] = useState("");
  const [followUpAns, setFollowUpAns] = useState("");
  const [wordLength, setWordLength] = useState(0);
  const [wordLengthF, setWordLengthF] = useState(0);
  const [enableEvaluationBtn, setenableEvaluationBtn] = useState(false);
  const [showEvaluate, setShowEvaluate] = useState(false);
  let [openPanels, setOpenPanels] = useState([]);
  const [finalUserAns, setFinalUserAns] = useState();
  const [finalFollowupAns, setFinalFollowUpAns] = useState();
  const modalRef = useRef();
  const { listRTW } = useSelector((state) => state.getWritingList);
  const [followUpShow, setFollowUpShow] = useState(false);
  const [nextBtn, setNxtbtn] = useState(false);
  const [feedbackState, setFeedbackState] = useState(true);
  let dataLength = listRTW.length;

  // useEffect(() => {
  //   setIndex(id);
  // }, [id]);

  useEffect(() => {
    if (id) {
      const data = listRTW.filter((val) => index === val.index);
      setData(data[0]);
      setBcolor(data[0].bookmark);
      setDeadline(Date.now() + 5 * 60000);
    } else {
      const data = listRTW.filter((val) => parseInt(rid) === val.index);
      setDeadline(Date.now() + 5 * 60000);
      setData(data[0]);
      setBcolor(data[0].bookmark);
    }

    setTimeout(() => {
      isBusy(false);
    }, 1000);
    dispatch(DisableVisibility());
  }, [data, index, busy]);

  useEffect(() => {
    if (followUpAns.length > 10) {
      setShowEvaluate(false);
    }
  }, [followUpAns]);

  const handleNext = () => {
    if (index <= --dataLength) {
      dispatch(clearGPTAssesmentResult());
      setIndex(++index);
      handleRetry();
      // clearTimeout();
      // setenableEvaluationBtn(false);
      // isBusy(true);
      // setFollowUpShow(false);
      navigate(`/practice/rtw-w/${index}`);
    }
  };
  const handlePrev = () => {
    if (index > 1) {
      dispatch(clearGPTAssesmentResult());
      setIndex(--index);
      handleRetry();
      // setenableEvaluationBtn(false);
      // isBusy(true);
      // setFollowUpShow(false);
      navigate(`/practice/rtw-w/${index}`);
    }
  };
  const handleEvaluate = () => {
    dispatch(clearGPTAssesmentResult());

    if (wordsLen(userAns) < 20) {
      dispatch(
        ShowNotification({
          severity: "Attention",
          message: "Write more Information",
        })
      );

      return;
    } else {
      const askData = {
        message: `
        'question':${data.qa.q}
        'passage':${userAns}
        'followupQuestion':${data.qa.fq}
        'followupPassage':${followUpAns}
        `,
        type: 2,
      };

      setOpenPanels(["1"]);
      setShowEvaluate(true);

      dispatch(getStatResult(askData));
      modalRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });

      setTimeout(() => {
        modalRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 1000);
    }

    return;
    if (userAns.length > 30) {
      setxmTime(null);
      setOpenPanels(["1"]);
      setShowEvaluate(true);
      dispatch(clearAssesmentResult());
      setFinalUserAns(userAns.replace(/\s*([,.!?:;]+)(?!\s*$)\s*/g, "$1 "));
      setFinalFollowUpAns(
        followUpAns.replace(/\s*([,.!?:;]+)(?!\s*$)\s*/g, "$1 ")
      );
      dispatch(
        getAssesmentResult(userAns.replace(/\s*([,.!?:;]+)(?!\s*$)\s*/g, "$1 "))
      );
      dispatch(
        getSecondAssesmentResult(
          followUpAns.replace(/\s*([,.!?:;]+)(?!\s*$)\s*/g, "$1 ")
        )
      );

      modalRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });

      setTimeout(() => {
        modalRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 1000);
    } else {
      dispatch(
        ShowNotification({
          severity: "info",
          message: "Please write more Information",
        })
      );
    }
  };

  const openNotification = (placement) => {
    notification.open({
      message: `Times Up`,
      placement: "top",
      type: "warning",
      style: {
        border: "2px solid red",
      },
    });
  };

  const openFollowUp = () => {
    // setSteps(false);
    setFollowUpShow(true);
    setSecondDeadline(Date.now() + 3 * 60000);
  };

  const handleRetry = () => {
    setShowEvaluate(false);
    dispatch(clearGPTAssesmentResult());
    isBusy(true);
    setDeadline(Date.now() + 5 * 60000);
    setenableEvaluationBtn(false);
    setxmTime(undefined);
    setUserAns("");
    setFollowUpAns("");
    setFollowUpShow(false);
    setNxtbtn(false);
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
    dispatch(clearAssesmentResult());
    setShowEvaluate(false);
    setUserAns("");
    setFollowUpAns("");
    setxmTime(undefined);
    setFollowUpShow(false);
    setNxtbtn(false);
    setenableEvaluationBtn(false);
    handleCloseModal();
  };

  const handleUserAns = (val) => {
    setUserAns(val);
    setWordLength(val.split(" ").length);
  };
  const handleFollowUpAns = (val) => {
    setFollowUpAns(val);
    setWordLengthF(val.split(" ").length);
  };

  const handleXmTime = (e) => {
    if (e <= 60000) {
      setTimeDanger(true);
    }
    if (e <= 180000) {
      setNxtbtn(true);
    }
  };

  const handleFollowUpTime = (e) => {
    if (e <= 60000) {
      setTimeDanger(true);
    }
    if (e <= 60000) {
      setenableEvaluationBtn(true);
    }
  };

  const handleFeedbackState = (val) => {
    setFeedbackState(val);
  };

  return (
    <div ref={modalRef}>
      {busy ? (
        <div className="w-full h-[30rem] flex justify-center m-auto sm:px-5 sm:py-10">
          {" "}
          <Skeleton active></Skeleton>
        </div>
      ) : (
        <div className="h-auto w-[99%] m-auto bg-[#fffffff7] md:px-5 md:py-5">
          <div
            onClick={closeModalWindow}
            className="absolute right-0 mr-3 md:mt-[-1rem] sm:mt-[10px] cursor-pointer"
          >
            <span>
              <IconCross height="1rem" width="1rem"></IconCross>
            </span>
          </div>
          <div className="flex flex-col gap-5 sm:px-2">
            {/* <h1 className="text-[22px] font-montserrat font-[500] underline self-center">
              Read then Write
            </h1> */}
            <div className="md:flex md:flex-row sm:flex sm:flex-col justify-between m-auto w-full mt-5">
              <div
                title="Back to List"
                className="mt-[6px] md:pr-4 sm:pr-2 cursor-pointer"
                onClick={() => navigate(`/duolingo/module/writing`)}
               >
                {" "}
                <span>
                  <IconsArrowLeft
                    height="1.3rem"
                    width="1.3rem"
                  ></IconsArrowLeft>
                </span>
              </div>
              <div className="flex m-auto w-full md:mt-0 sm:mt-5">
                <div className="self-start">
                  <div className="flex justify-start md:gap-4 sm:gap-2 sm:text-[11px] font-[400] sm:ml-3 md:ml-0">
                    <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                      {data.level === 1
                        ? "Easy"
                        : data.level === 2
                        ? "Medium "
                        : "Hard"}
                    </p>
                    <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                      Practice: {data.practice}
                    </p>
                    <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                      Total Attempt: {data.total_tested}
                    </p>
                  </div>
                </div>
                <div
                  className="cursor-pointer px-2 py-2 ml-3 md:mt-[-2px] sm:mt-[-1px]"
                  onClick={() =>
                    handleBookmark(data.id, data.type, data.inner_type)
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

              <div>
                <div
                  className={`${
                    !followUpShow ? "md:relative sm:fixed" : "hidden"
                  } ml-1 font-[700] text-[20px] bg-[#DDE9F8] w-min px-2 py-1
                  rounded-md  sm:right-0 sm:mt-[15%] md:mt-0`}
                >
                  <Countdown
                    onChange={handleXmTime}
                    valueStyle={
                      timeDanger ? { color: "red" } : { color: "blue" }
                    }
                    // onFinish={openFollowUp}
                    value={deadline}
                    format="mm:ss"
                  />
                </div>
                <div
                  className={`${
                    followUpShow ? "md:relative sm:fixed" : "hidden"
                  } ml-1 font-[700] text-[20px] bg-[#DDE9F8] w-min px-2 py-1
                  rounded-md  sm:right-0 sm:mt-[15%] md:mt-0`}
                >
                  <Countdown
                    onChange={handleFollowUpTime}
                    valueStyle={
                      timeDanger ? { color: "red" } : { color: "blue" }
                    }
                    onFinish={openNotification}
                    value={secondDeadline}
                    format="mm:ss"
                  />
                </div>
              </div>
            </div>

            {/* <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins mt-[1.5rem] font-[600]">
              Respond to the question in at least 50 words
            </h1> */}

            <div className="w-[95%] m-auto sm:mt-3">
              <div className="flex md:flex-row sm:flex-col justify-between h-full md:gap-10 sm:gap-4">
                <div className=" md:w-full sm:w-[95%] sm:m-auto h-full flex flex-col justify-between">
                  <div className="flex gap-10 mt-2">
                    <div
                      className={`${
                        !followUpShow ? "opacity-100" : "opacity-50"
                      } md:w-[45%] sm:w-full sm:m-auto sm:mt-5 md:mt-0`}
                    >
                      <h1 className="font-poppins font-[700] text-[20px] px-2 py-3 ml-[-2.5rem]">
                        <span className="bg-blue-400 rounded-full px-[2.1%] mr-[8px] text-white">
                          1
                        </span>
                        Write about the topic below for 5 minutes
                      </h1>
                      <h1
                        className=" md:text-[18px] sm:text-[15px]
                       font-poppins font-[500] px-1"
                      >
                        {data.qa.q}
                      </h1>
                      <TextArea
                        spellCheck={false}
                        disabled={followUpShow ? true : false}
                        className="w-full disabled bg-transparent text-[18px] font-montserrat mt-4"
                        rows={12}
                        value={userAns}
                        onChange={(e) => handleUserAns(e.target.value)}
                        placeholder="Start Your Typing...."
                        maxLength={2000}
                      />
                      <div
                        className={`${
                          followUpShow ? "hidden" : "flex"
                        } self-end flex justify-between px-1 py-2 font-[600]`}
                      >
                        <h1>Word Count: {wordLength}</h1>
                        <button
                          disabled={!nextBtn ? true : false}
                          onClick={openFollowUp}
                          className={`${nextBtn ? "block" : "hidden"}
                           bg-tahiti  px-6 py-3 rounded-md  drop-shadow-sm text-white`}
                        >
                          Next
                        </button>
                        <span
                          className={`${nextBtn ? "hidden" : "block"}
                         bg-gray-100 px-2 py-2 rounded-md text-gray-500`}
                        >
                          Continue after 2 minutes
                        </span>
                      </div>
                    </div>

                    <div
                      className={`${
                        followUpShow ? "opacity-100" : "opacity-50"
                      } md:w-[45%] sm:w-full sm:m-auto sm:mt-5 md:mt-0`}
                    >
                      <h1 className="font-poppins font-[700] text-[20px] px-2 py-3 ml-[-2.5rem]">
                        <span className="bg-blue-400 rounded-full px-[1.5%]  mr-[8px] text-white">
                          2
                        </span>
                        Write a follow-up response for 3 minutes.
                      </h1>
                      <h1
                        className=" md:text-[18px] sm:text-[15px]
                       font-poppins font-[500] px-1"
                      >
                        {data.qa.fq}
                      </h1>
                      <TextArea
                        spellCheck={false}
                        disabled={!followUpShow ? true : false}
                        className="w-full disabled bg-transparent text-[18px] font-montserrat mt-4"
                        rows={12}
                        value={followUpAns}
                        onChange={(e) => handleFollowUpAns(e.target.value)}
                        placeholder="Start Your Typing...."
                        maxLength={2000}
                      />
                      <div className="self-end flex justify-end px-1 py-2 font-[600]">
                        <h1>Word Count: {wordLengthF}</h1>
                      </div>
                    </div>
                  </div>
                  {/* <h1
                    className=" md:text-[18px] sm:text-[15px]
                  font-poppins font-[500] "
                  >
                    {data.qa.q}
                  </h1> */}
                  {/* <div
                    className={`${thinkTimeholders ? "flex" : "hidden"}  gap-2`}
                    >
                    <div
                      className={`${showThinkTime ? "block" : "hidden"} mt-5`}
                     >
                      <Countdown
                        onFinish={!isStartExam ? startWriting : null}
                        onChange={(e) => (e <= 10000 ? setStartExam(true) : "")}
                        valueStyle={
                          timeDanger ? { color: "red" } : { color: "blue" }
                        }
                        value={thinkTime}
                        format="mm:ss"
                      />
                    </div>

                    <button
                      disabled={!startExam ? true : false}
                      onClick={startWriting}
                      className={`${
                        startExam ? "opacity-100" : "opacity-50"
                      } bg-[#3AB7BF] px-2 py-2 self-end rounded-md text-white font-[500]`}
                    >
                      Start Writing
                    </button>
                  </div> */}
                </div>
              </div>
            </div>

            <div
              className="flex gap-5 justify-center mt-10 font-poppins
             font-[500] sm:text-[12px] md:text-[15px]"
            >
              <button
                onClick={handleRetry}
                className="bg-[#DDE9F8]  px-6 py-3 rounded-md drop-shadow-sm"
              >
                Retry
              </button>
              <button
                disabled={!enableEvaluationBtn ? true : false}
                onClick={handleEvaluate}
                className={`${
                  enableEvaluationBtn ? "opacity-100" : "opacity-50"
                } bg-[#DDE9F8]  px-6 py-3 rounded-md  drop-shadow-sm`}
              >
                Evaluate
              </button>
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
                  {index}
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

            <div className="mt-5  flex justify-center">
              <div
                className={`${
                  showEvaluate ? "block" : "hidden"
                } "h-auto w-[95%] m-auto"`}
              >
                <Collapse
                  activeKey={openPanels}
                  onChange={setOpenPanels}
                  style={{ backgroundColor: "#DDE9F8" }}
                  accordion
                  items={[
                    {
                      key: "1",
                      label: "Evaluation Result",
                      children: (
                        <div className="flex flex-col gap-2 justify-between">
                          <div className="md:w-full sm:w-full m-auto md:flex md:flex-row sm:flex-col justify-center ">
                            <div>
                              <AssesmentContainerIW
                                qData={data}
                                userAns={userAns}
                                followUpAns={followUpAns}
                                sampleAns={data.qa.a}
                                feedbackState={feedbackState}
                                handleFeedbackState={handleFeedbackState}
                                isTwoStep={true}
                              ></AssesmentContainerIW>
                            </div>
                          </div>
                          <div></div>
                        </div>
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
