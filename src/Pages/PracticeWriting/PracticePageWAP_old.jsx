import React, { useEffect, useRef, useState } from "react";
import { Input, Modal, Skeleton } from "antd";
import { Tag, Button, notification, Collapse, Grid } from "antd";
import { Statistic } from "antd";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getWordDetails } from "../../redux/slices/disctionary";
import {
  DisableVisibility,
  ToggleVisibility,
} from "../../redux/slices/fillgap";
import axiosInstance from "../../utils/axios";
import Identify from "../../Components/Assesment/Identify";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import { clearStatDataError, saveStatData } from "../../redux/slices/statistic";
import { ReactComponent as LoadingComponent } from "../../../src/Assets/SVG/IconLoadingBlock.svg";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { toggleBookmark } from "../../redux/slices/bookmark";
import IconCross from "../../Assets/SVG/IconCross";
import AssmentContainer from "../../Components/Assesment/AssmentContainer";
import {
  clearAssesmentResult,
  getAssesmentResult,
} from "../../redux/slices/assesmentResult";
import { ShowNotification } from "../../redux/actions";
const { TextArea } = Input;
const { Countdown } = Statistic;
const { useBreakpoint } = Grid;

export default function PracticePageWAP({ id, handleCloseModal }) {
  const dispatch = useDispatch();

  let [index, setIndex] = useState(id);

  const [api, contextHolder] = notification.useNotification();
  const [play, setPlay] = useState(true);
  const [timeDanger, setTimeDanger] = useState(false);
  const [busy, isBusy] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [modelAns, setModelAns] = useState();
  const [userAns, setUserAns] = useState("");
  const [finalUserAns, setFinalUserAns] = useState();
  const [bColor, setBcolor] = useState(true);
  const [wordLength, setWordLength] = useState(0);
  let [openPanels, setOpenPanels] = useState([]);
  const modalRef = useRef();

  const { rid } = useParams();
  let [data, setData] = useState({});
  const [deadline, setDeadline] = useState(2);
  const [xmTime, setXmTime] = useState(null);
  const [inputAvailable, setInputAvailable] = useState(true);
  const { listWAP } = useSelector((state) => state.getWritingList);
  const { visibility } = useSelector((state) => state.fillgap);
  const { error } = useSelector((state) => state.statistic);
  const [loadingAssesment, setLoadingAssesmen] = useState(false);
  const { ev_permissions } = useSelector((state) => state.subscription);
  const [bootCounter, setbootCounter] = useState(true);
  const [loadingImage, setLoadingImg] = useState(true);
  const [imgLink, setImgLink] = useState(null);
  const [enableEvaluationBtn, setenableEvaluationBtn] = useState(true);
  const [showEvaluate, setShowEvaluate] = useState(false);
  const [purchaseReqModal, setPurchaseReqModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);

  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "70vw" };

  const { showAssesmentLoading } = useSelector(
    (state) => state.assesmentResult
  );
  let dataLength = listWAP.length;

  useEffect(() => {
    setIndex(id);
  }, [id]);

  useEffect(() => {
    notification.destroy();
    if (!bootCounter) {
      setbootCounter(true);
      setData(undefined);
      setDeadline(undefined);
    }
  }, [bootCounter]);

  useEffect(() => {
    if (id) {
      const data = listWAP.filter((val) => index === val.index);
      setData(data[0]);
      setBcolor(data[0].bookmark);
      setDeadline(data[0]?.time * 60000);
      setImgLink(data[0].image);
    } else {
      const data = listWAP.filter((val) => parseInt(rid) === val.id);
      setDeadline(data[0]?.time * 60000);
      setData(data[0]);
      setBcolor(data[0].bookmark);
      setImgLink(data[0].image);
    }
    setTimeout(() => {
      isBusy(false);
    }, 1000);
    dispatch(DisableVisibility());
  }, [data, index, busy, bootCounter]);

  useEffect(() => {
    setLoadingAssesmen(false);
  }, [showAssesmentLoading]);

  const handleNext = () => {
    if (index <= --dataLength) {
      setIndex(++index);
      setLoadingImg(true);
      setenableEvaluationBtn(true);
      setInputAvailable(true);
      setShowEvaluate(false);
      dispatch(clearAssesmentResult());
      setUserAns("");
      handleRetry();
    }
  };
  const handlePrev = () => {
    if (index > 1) {
      setIndex(--index);
      setLoadingImg(true);
      setenableEvaluationBtn(true);
      setShowEvaluate(false);
      setInputAvailable(true);
      dispatch(clearAssesmentResult());
      setUserAns("");
      isBusy(true);
    }
  };

  const handleEvaluate = () => {
    // assesment();
    // dispatch(ToggleVisibility());
    // scrollBtm()
    // minimum 10 words

    if (userAns.length > 5) {
      // if (!ev_permissions) {
      //   setPurchaseReqModal(true);
      //   return;
      // }
      setXmTime(null);
      setOpenPanels(["1"]);
      setInputAvailable(false);
      setShowEvaluate(true);
      setLoadingAssesmen(true);
      dispatch(clearAssesmentResult());
      setFinalUserAns(userAns.replace(/\s*([,.!?:;]+)(?!\s*$)\s*/g, "$1 "));
      dispatch(
        getAssesmentResult(userAns.replace(/\s*([,.!?:;]+)(?!\s*$)\s*/g, "$1 "))
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
          message: "Write more Information",
        })
      );
    }
  };

  const openNotification = () => {
    setInputAvailable(false);
    notification.open({
      message: `Times Up`,
      placement: "top",
      type: "warning",
      style: {
        border: "2px solid red",
      },
    });
  };

  const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
  };
  const handleRetry = () => {
    setXmTime(Date.now() + 1000 + deadline);
    setWordLength(0);
    setUserAns("");
    setInputAvailable(true);
    setenableEvaluationBtn(true);
    setShowEvaluate(false);
    dispatch(clearAssesmentResult());
    isBusy(true);

    // dispatch(ToggleVisibility());
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

  const handleUserAns = (val) => {
    setUserAns(val);
    setWordLength(val.split(" ").length);
  };
  const closeModalWindow = () => {
    setImgLink(null);
    setbootCounter(false);
    setShowEvaluate(false);
    setXmTime(undefined);
    setUserAns("");
    setInputAvailable(true);
    setDeadline(null);
    dispatch(clearAssesmentResult());
    setenableEvaluationBtn(true);
    isBusy(true);
    handleCloseModal();
  };

  const handleXmTime = (e) => {
    if (e <= 30000) {
      setTimeDanger(true);
      setenableEvaluationBtn(false);
    }
  };

  const hanldeOnLoad = () => {
    setLoadingImg(false);
    setXmTime(Date.now() + 1000 + deadline);
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
          <div
            className={`${
              loadingAssesment ? "block" : "hidden"
            } flex justify-center z-50`}
          >
            <div className="absolute top-[40%] bottom-[50%] m-auto z-50 ">
              <LoadingComponent></LoadingComponent>
              <p className="text-center text-[25px] font-poppins text-gray-700 font-[600]">
                Generating Result...
              </p>
            </div>
          </div>

          <div
            className={`${
              loadingAssesment ? "blur-sm" : ""
            } flex flex-col gap-5 sm:px-2 `}
          >
            {/* <h1 className="text-[22px] font-montserrat font-[500] underline self-center">
              Write about the Photo
            </h1> */}
            <div className="md:flex md:flex-row sm:flex sm:flex-col justify-between m-auto w-full mt-5">
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
                  value={xmTime}
                  format="mm:ss"
                />
              </div>
            </div>

            <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins mt-[2.5rem] font-[600]">
              Write a description of the image below for 1 minute.
            </h1>

            <div className="md:w-[95%] sm:w-full m-auto mt-[2rem]">
              <div className="flex md:flex-row sm:flex-col justify-between gap-10">
                <div
                  className={`${
                    loadingImage ? "hidden" : "block"
                  } md:h-[15rem] md:w-[21rem] sm:h-[16rem] sm:w-[95%] self-center mt-[-2rem]`}
                >
                  <img
                    onLoad={hanldeOnLoad}
                    loading="eager"
                    className="h-full w-full rounded-md object-fill"
                    src={`https://practicemania.s3.ap-south-1.amazonaws.com/duolingo/${imgLink}`}
                    alt={"write_about_the_photo"}
                  ></img>
                </div>
                <div className="md:w-[60%] sm:w-full sm:m-auto">
                  <div>
                    <TextArea
                      spellCheck={false}
                      disabled={visibility || !inputAvailable ? true : false}
                      className="w-full disabled bg-transparent text-[18px] font-montserrat"
                      rows={10}
                      value={userAns}
                      minLength={5}
                      onChange={(e) => handleUserAns(e.target.value)}
                      placeholder="Start Your Typing...."
                      maxLength={2000}
                    />
                  </div>
                  <div className="self-end flex justify-end px-1 py-2 font-[600]">
                    <h1>Word Count: {wordLength}</h1>
                  </div>
                </div>
              </div>
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
                            <AssmentContainer
                              qData={data}
                              sampleAns={data?.qa?.a}
                            ></AssmentContainer>
                          </div>
                          <div>
                            <div className="h-auto w-[92%] m-auto">
                              <Collapse
                                accordion
                                items={[
                                  {
                                    key: "1",
                                    label: "Sample Answer",
                                    children: (
                                      <p className=" text-[17px] font-poppins h-auto px-1 flex flex-wrap gap-1">
                                        {data.qa.a.split(" ").map((val) => (
                                          <span
                                            className="cursor-pointer md:hover:text-blue-500 "
                                            onClick={handleMeaning}
                                          >
                                            {" " + val}
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
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center m-auto">
            <Modal
              style={config}
              footer={null}
              onCancel={() => setPurchaseReqModal(false)}
              open={purchaseReqModal}
              className=" top-[5rem] m-auto z-10"
            >
              <div>
                <div className="">
                  <h1 className="text-yellow-600 font-poppins font-[600] text-[20px] text-center">
                    Account Upgrade Required!
                  </h1>

                  <p className="mt-3 text-[15px] font-montserrat text-center">
                    You Have used 20 free AI Evaluation on Pactice Test!{" "}
                    <br></br>
                    Explore plans to Upgrade your account
                  </p>

                  <div className="mt-10">
                    <Link
                      to={"duolingo/module/vocabulary"}
                      className="bg-[#3AB7BF] px-3 py-2 mt-5 text-[15px] rounded-md text-white font-[700] 
                    m-auto flex justify-center"
                    >
                      Upgrade
                    </Link>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}
