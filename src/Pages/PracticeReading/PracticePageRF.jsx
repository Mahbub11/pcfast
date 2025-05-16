import React, { useEffect, useState } from "react";
import { notification, Collapse } from "antd";
import { Statistic, Skeleton } from "antd";
import PracticeComponentRC from "../../Components/Reading/PracticeComponentRC";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearUserInputs,
  DisableVisibility,
  ToggleVisibility,
} from "../../redux/slices/fillgap";
import { getWordDetails } from "../../redux/slices/disctionary";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import { clearStatDataError, saveStatData } from "../../redux/slices/statistic";
import { useNavigate, useParams } from "react-router-dom";
import IconCross from "../../Assets/SVG/IconCross";
import { toggleBookmark } from "../../redux/slices/bookmark";
import { StarOutlined, StarFilled } from "@ant-design/icons";
const { Countdown } = Statistic;

export default function PracticePageRF({ id, handleCloseModal }) {
  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();
  const [timeDanger, setTimeDanger] = useState(false);
  const [busy, isBusy] = useState(true);
  let [data, setData] = useState({});
  const [deadline, setDeadline] = useState(2);
  const { rid } = useParams();
  let [index, setIndex] = useState(rid);
  const { listRF } = useSelector((state) => state.getReadingList);
  const { userInput } = useSelector((state) => state.fillgap);
  const { error } = useSelector((state) => state.statistic);
  const { userInfo } = useSelector((state) => state.auth);
  const [bColor, setBcolor] = useState(true);
  const [bootCounter, setbootCounter] = useState(true);
  const [enableEvaluationBtn, setenableEvaluationBtn] = useState(true);
  const [showModelAns, setShowModelAns] = useState(false);
  let [openPanels, setOpenPanels] = useState([]);
   const navigate = useNavigate()
  let dataLength = listRF.length;

  // useEffect(() => {
  //   setIndex(id);
  // }, [id]);

  useEffect(() => {
    notification.destroy();
    if (!bootCounter) {
      setbootCounter(true);
      setDeadline(undefined);
    }
  }, [bootCounter]);

  useEffect(() => {
    if (id) {
      const data = listRF.filter((val) => index === val.index);
      setData(data[0]);
      setBcolor(data[0].bookmark);
      setDeadline(Date.now() + data[0]?.time * 60000);
    } else {
      const data = listRF.filter((val) => parseInt(rid) === val.index);
      setDeadline(Date.now() + data[0]?.time * 60000);
      setBcolor(data[0].bookmark);
      setData(data[0]);
    }
    setTimeout(() => {
      isBusy(false);
    }, 1000);

    dispatch(DisableVisibility());
  }, [data, index, busy]);

  const handleNext = () => {
    if (index <= --dataLength) {
      setIndex(++index);
      const fields = Array.from(document.querySelectorAll("#inputBox")) || [];
      fields.map((field) => (field.value = ""));
      dispatch(ClearUserInputs());
      // setenableEvaluationBtn(true);
      // setShowModelAns(false);
      setShowModelAns(false);
      isBusy(true);
      navigate(`/practice/rf-r/${index}`);
    }
  };
  const handlePrev = () => {
    if (index > 1) {
      setIndex(--index);
      const fields = Array.from(document.querySelectorAll("#inputBox")) || [];
      fields.map((field) => (field.value = ""));
      dispatch(ClearUserInputs());
      // setenableEvaluationBtn(true);
     setShowModelAns(false);
      isBusy(true);
      navigate(`/practice/rf-r/${index}`);
    }
  };
  const handleEvaluate = () => {
    dispatch(ToggleVisibility());
    setShowModelAns(true);

    let correct = 0;
    data.qa.a.map((val, i) => (userInput[i] === val.trim() ? ++correct : ""));
    const ansLength = data.qa.a.length;

    const statData = {
      user: userInfo.id,
      qn: data.id,
      level: data.level,
      type: data.type,
      inner_type: data.inner_type,
      time: data.time,
      result: ((correct / ansLength) * 100).toFixed(2),
    };

    setOpenPanels(["1"]);
    setDeadline(null);
    dispatch(saveStatData(statData));
  };

  const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
  };
  const handleRetry = () => {
    setDeadline(Date.now() + data.time * 60000);
    setenableEvaluationBtn(true);
    dispatch(DisableVisibility());
    setShowModelAns(false);
    const fields = Array.from(document.querySelectorAll("#inputBox")) || [];
    fields.map((field) => (field.value = ""));
    dispatch(ClearUserInputs());
    isBusy(true);
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

  const openNotification = () => {
    notification.open({
      message: `Times Up`,
      placement: "top",
      type: "warning",
      style: {
        border: "2px solid red",
      },
    });
  };

  const closeModalWindow = () => {
    setShowModelAns(false);
    setenableEvaluationBtn(false);
    dispatch(ClearUserInputs());
    setbootCounter(false);
    setDeadline(null);
    isBusy(true);
    handleCloseModal();
  };
  const handleXmTime = (e) => {
    if (e <= 120000) {
      setenableEvaluationBtn(false);
    }
    if (e <= 60000) {
      setTimeDanger(true);
    }
  };

  return (
    <div>
      {busy ? (
        <div className="w-full h-[30rem] flex justify-center m-auto sm:px-5 sm:py-10">
          {" "}
          <Skeleton active></Skeleton>
        </div>
      ) : (
        <div className="h-auto sm:w-full md:w-[99%] m-auto bg-[#fffffff7] md:px-5 md:py-5 ">
          {/* <div
            onClick={closeModalWindow}
            className="absolute right-0 mr-3 md:mt-[-25px] sm:mt-[10px] cursor-pointer"
          >
            <span>
              <IconCross height="1rem" width="1rem"></IconCross>
            </span>
          </div> */}
          <div className="flex flex-col md:gap-5 sm:gap-2">
            {/* <h1 className="text-[22px] font-montserrat font-[500] underline self-center">
              Read and Complete
            </h1> */}

            <div className="md:flex md:flex-row sm:flex sm:flex-col justify-between m-auto w-full mt-5">
              <div
                title="Back to List"
                className="mt-[6px] md:pr-4 sm:pr-2 cursor-pointer"
                onClick={() => navigate(`/duolingo/module/reading`)}
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
                  <div className="flex justify-start md:gap-4 sm:gap-2 sm:text-[13px] font-[400] sm:ml-3 md:ml-0">
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
                  className="cursor-pointer px-2 py-2 ml-3 md:mt-[2px] sm:mt-[1px]"
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

              <div
                className="ml-1 font-[700] text-[20px] bg-[#DDE9F8] w-min px-2 py-1
                rounded-md md:relative sm:fixed sm:right-0 sm:mt-[15%] md:mt-0"
              >
                <Countdown
                  onChange={handleXmTime}
                  valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
                  onFinish={openNotification}
                  value={deadline}
                  format="mm:ss"
                />
              </div>
            </div>

            <h1
              className="sm:text-[17px] md:text-[25px] md:mt-[1.5rem]  self-center 
            font-poppins sm:text-center md:text-start font-[600] md:block sm:hidden"
            >
              Complete the Sentence with Correct Word
            </h1>

            <div className="md:w-[95%] sm:w-full m-auto md:border-[1px] rounded-md md:mt-[1.5rem] sm:mt-[2rem]">
              {data ? (
                <PracticeComponentRC
                  questionAns={data?.qa}
                  title={data?.title}
                ></PracticeComponentRC>
              ) : (
                ""
              )}
            </div>

            <div className="flex gap-5 justify-center mt-5 font-poppins font-[500] sm:text-[12px] md:text-[15px]">
              <button
                onClick={handleRetry}
                className="bg-[#DDE9F8]  px-6 py-3 rounded-md drop-shadow-sm"
              >
                Retry
              </button>
              <button
                // disabled={enableEvaluationBtn ? true : false}
                onClick={handleEvaluate}
                className={`${
                  enableEvaluationBtn ? "opacity-50" : "opacity-100"
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
                        <p className="flex gap-3 text-[17px] font-poppins h-auto px-1 flex-wrap">
                          {data?.qa.a.map((val) => (
                            <p
                              className="cursor-pointer md:hover:text-tahiti"
                              onClick={handleMeaning}
                            >
                              {val + " "}
                            </p>
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
