import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collapse, Skeleton, Tag } from "antd";
import { ToggleVisibility } from "../../redux/slices/fillgap";
import RCContainer from "../../Components/MockTest/Reading/RCContainer";
import VocWordChoice from "../../Components/MockTest/Voc/VocWordChoice";
import SALContainer from "../../Components/MockTest/Speaking/SALContainer";
import LLTContainer from "../../Components/MockTest/Listening/LLTContainer";
import WAPContainer from "../../Components/MockTest/Writing/WAPContainer";
import InteractiveContainer from "../../Components/MockTest/Reading/Interactive/InteractiveContainer";
import LLIContainer from "../../Components/MockTest/Listening/LLIContainer";
import WRWContainer from "../../Components/MockTest/Writing/WRWContainer";
import SLSContainer from "../../Components/MockTest/Speaking/SLSContainer";
import SAPContainer from "../../Components/MockTest/Speaking/SAPContainer";
import SRSContainer from "../../Components/MockTest/Speaking/SRSContainer";
import WSContainer from "../../Components/MockTest/Writing/WSContainer";
import SSContainer from "../../Components/MockTest/Speaking/SSContainer";
import { Link, useNavigate } from "react-router-dom";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import IconArrowDown from "../../Assets/SVG/IconArrowDown";
import { saveMockTestResult } from "../../redux/slices/mockTest";
import { LIVE_URL } from "../../config";

export default function MockTestComplete({ showEv }) {
  const { mockTestUserAns, mockData } = useSelector((state) => state.mockTest);
  const { userInfo } = useSelector((state) => state.auth);
  let [openPanels, setOpenPanels] = useState([]);
  const [estimatedResult, setEstimatedResult] = useState(0);
  const [nextEstimatedResult, setNextEstimatedResult] = useState(0)
  const [busy, setBusy] = useState(true);
  const [literacy, setLiteracy] = useState(0);
  const [conversation, setConversation] = useState(0);
  const [production, setProduction] = useState(0);
  const [comprehension, setComprehension] = useState(0);
  const [isExpand, setIsExpand] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(showEv)
  useEffect(() => {
    if (showEv) {
      dispatch(ToggleVisibility());
    }
    // setOpenPanels(["1"]);
  }, [showEv]);

  useEffect(() => {
    let totalResult = 0;
    let literacy = 0;
    let production = 0;
    let conversation = 0;
    let comprension = 0;

    mockTestUserAns.map((item, index) => {
      if (item.inner_type === 31) {
        totalResult += parseInt(item.result);
        comprension += parseInt(item.result);
        literacy += parseInt(item.result);
      } else if (item.inner_type === 11) {
        totalResult += parseInt(item.result);
        comprension += parseInt(item.result);
        literacy += parseInt(item.result);
      } else if (item.inner_type === 41) {
        totalResult += parseInt(item.result);
        production += parseInt(item.result);
        conversation += parseInt(item.result);
      } else if (item.inner_type === 51) {
        totalResult += parseInt(item.result);
        comprension += parseInt(item.result);
        conversation += parseInt(item.result);
      } else if (item.inner_type === 21) {
        totalResult += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );

        production += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );
        literacy += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );
      } else if (item.inner_type === 32) {
        totalResult += parseInt(item.result);
        comprension += parseInt(item.result);
        literacy += parseInt(item.result);
      } else if (item.inner_type === 52) {
        totalResult += parseInt(item.result);
        comprension += parseInt(item.result);
        conversation += parseInt(item.result);
      } else if (item.inner_type === 22) {
        totalResult += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );
        production += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );
        literacy += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );
      } else if (item.inner_type === 44) {
        totalResult += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );

        conversation += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );
        production += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );
      } else if (item.inner_type === 42) {
        totalResult += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );
        conversation += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );
        production += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );
      } else if (item.inner_type === 43) {
        totalResult += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );
        conversation += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );
        production += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );
      } else if (item.inner_type === 23) {
        totalResult += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );
        production += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );
        literacy += parseInt(
          item.overAllResult ? item.overAllResult.overall : 0
        );
      }
    });

    const estResult =
      Math.round(
        (Math.round((literacy / 13 / 100) * 160) +
          Math.round((conversation / 16 / 100) * 160) +
          Math.round((production / 12 / 100) * 160) +
          Math.round((comprension / 17 / 100) * 160)) /
          4
      ) ;

    const estGrand = increaseToNextMultipleOfFive(estResult);
    const getRandomNumber=randomInteger(5,20)
    setNextEstimatedResult(increaseToNextMultipleOfFive(getRandomNumber+estResult))
    setEstimatedResult(estGrand);

    setLiteracy(Math.round((literacy / 13 / 100) * 160));
    setConversation(Math.round((conversation / 16 / 100) * 160));
    setProduction(Math.round((production / 12 / 100) * 160));
    setComprehension(Math.round((comprension / 17 / 100) * 160));

    const mockResult = {
      userid: userInfo.id,
      mockid: mockData[0].id,
      result: estGrand,
    };

    if (showEv) {
      dispatch(saveMockTestResult(mockResult));
    }

    setBusy(false);
  }, [busy, showEv]);

  function increaseToNextMultipleOfFive(number) {
    let increasedNumber = Math.ceil(number / 5) * 5; // Increase to the next multiple of 5
    return increasedNumber;
  }
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const handleQuitMockTest = () => {
    window.location.reload();
  };


  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div className="w-full h-auto font-poppins">
          <div
            className="h-full p-10 w-[90%] 
          m-auto flex-col justify-between font-poppins mt-10"
          >
            <div className="flex-col w-[50%] justify-start">
              <h1 className="text-[35px] font-[800] font-poppinsBold">
                Mock Test Complete!
              </h1>
              <p>
                Your graded responses to each mock test question are listed
                below. You will see right answers, anticipated scores, and
                comments depending on the type of question.
              </p>
            </div>
            <div className="flex justify-between  w-full m-auto mt-5">
              <div className="h-auto w-[60%] ">
                <div className="h-auto w-full m-auto">
                  <Collapse
                    activeKey={openPanels}
                    onChange={setOpenPanels}
                    accordion
                    style={{ backgroundColor: "#DDE9F8", padding: "1rem" }}
                    items={[
                      {
                        key: "1",
                        showArrow: false,
                        style: { border: "none" },
                        label: (
                          <div className="flex justify-between w-full px-2 py-1">
                            <div className="flex gap-5">
                              <div className="flex gap-2 justify-center m-auto">
                                <span
                                  className={`${
                                    openPanels.length > 0 ? "hidden" : "block"
                                  } mt-[13px]`}
                                >
                                  <IconsArrowRight
                                    height="1rem"
                                    width="1rem"
                                  ></IconsArrowRight>
                                </span>

                                <span
                                  className={`${
                                    openPanels.length > 0 ? "block" : "hidden"
                                  } mt-3`}
                                >
                                  <IconArrowDown
                                    height="1.3rem"
                                    width="1.3rem"
                                  ></IconArrowDown>
                                </span>

                                <h2 className="font-[600] text-[25px] text-gray-700 mt-[-1px]">
                                  {" "}
                                  Result Breakdown
                                </h2>
                              </div>
                            </div>
                          </div>
                        ),
                        children: (
                          <div>
                            {mockTestUserAns.map((item, index) => {
                              return (
                                <div className="mt-3">
                                  {/* {console.log(item)} */}

                                  {item.inner_type === 31 ? (
                                    <Collapse
                                      activeKey={openPanels}
                                      onChange={setOpenPanels}
                                      accordion
                                      style={{
                                        border: "none",
                                        padding: "1rem",
                                      }}
                                      items={[
                                        {
                                          key: "1",
                                          showArrow: false,
                                          style: { border: "none" },
                                          label: (
                                            <div className="flex justify-between w-full px-2 py-1">
                                              <div className="flex gap-5">
                                                <div className="flex gap-2 justify-center m-auto">
                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "hidden"
                                                        : "block"
                                                    } mt-[13px]`}
                                                  >
                                                    <IconsArrowRight
                                                      height="1rem"
                                                      width="1rem"
                                                    ></IconsArrowRight>
                                                  </span>

                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "block"
                                                        : "hidden"
                                                    } mt-3`}
                                                  >
                                                    <IconArrowDown
                                                      height="1.3rem"
                                                      width="1.3rem"
                                                    ></IconArrowDown>
                                                  </span>

                                                  <h2 className="font-[600] text-[25px] text-gray-700 mt-[-1px]">
                                                    {" "}
                                                    Read and Complete
                                                  </h2>
                                                </div>

                                                <div className="flex flex-wrap gap-2 text-center m-auto  text-[20px]">
                                                  <Tag
                                                    className="m-auto text-[20px] flex justify-center px-1 py-1"
                                                    color="magenta"
                                                  >
                                                    comprehension
                                                  </Tag>
                                                  <Tag
                                                    className="m-auto text-[20px] px-1 py-1"
                                                    color="green"
                                                  >
                                                    literacy
                                                  </Tag>
                                                </div>
                                              </div>
                                              <h2 className="bg-tahiti text-white rounded-md px-3 text-[22px] py-1 font-[600] drop-shadow-sm">{` ${Math.round(
                                                item.result
                                              )}%`}</h2>
                                            </div>
                                          ),
                                          children: (
                                            <div>
                                              <RCContainer
                                                question={item.q}
                                                ans={item.a}
                                                userAns={item.userAns}
                                              ></RCContainer>
                                            </div>
                                          ),
                                        },
                                      ]}
                                    />
                                  ) : (
                                    ""
                                  )}

                                  {item.inner_type === 11 ? (
                                    <Collapse
                                      accordion
                                      activeKey={openPanels}
                                      onChange={setOpenPanels}
                                      style={{
                                        border: "none",
                                        padding: "1rem",
                                      }}
                                      items={[
                                        {
                                          key: "1",
                                          style: { border: "none" },
                                          showArrow: false,
                                          label: (
                                            <div className="flex justify-between w-full px-2 py-1">
                                              <div className="flex gap-5">
                                                <div className="flex gap-2 justify-center m-auto">
                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "hidden"
                                                        : "block"
                                                    } mt-[13px]`}
                                                  >
                                                    <IconsArrowRight
                                                      height="1rem"
                                                      width="1rem"
                                                    ></IconsArrowRight>
                                                  </span>

                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "block"
                                                        : "hidden"
                                                    } mt-3`}
                                                  >
                                                    <IconArrowDown
                                                      height="1.3rem"
                                                      width="1.3rem"
                                                    ></IconArrowDown>
                                                  </span>

                                                  <h2 className="font-[600] text-[25px] text-gray-700 mt-[-1px]">
                                                    {" "}
                                                    Read and Select
                                                  </h2>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-center m-auto  text-[20px]">
                                                  <Tag
                                                    className="m-auto text-[20px] flex justify-center px-1 py-1"
                                                    color="magenta"
                                                  >
                                                    comprehension
                                                  </Tag>
                                                  <Tag
                                                    className="m-auto text-[20px] px-1 py-1"
                                                    color="green"
                                                  >
                                                    literacy
                                                  </Tag>
                                                </div>
                                              </div>

                                              <h2 className="bg-tahiti text-white rounded-md px-3 text-[22px] py-1 font-[600] drop-shadow-sm">{` ${Math.round(
                                                item.result
                                              )}%`}</h2>
                                            </div>
                                          ),
                                          children: (
                                            <div>
                                              <VocWordChoice
                                                q={item.q}
                                                a={item.a}
                                                userAns={item.userAns}
                                              ></VocWordChoice>
                                            </div>
                                          ),
                                        },
                                      ]}
                                    />
                                  ) : (
                                    ""
                                  )}

                                  {item.inner_type === 41 ? (
                                    <Collapse
                                      accordion
                                      activeKey={openPanels}
                                      onChange={setOpenPanels}
                                      style={{
                                        border: "none",
                                        padding: "1rem",
                                      }}
                                      items={[
                                        {
                                          key: "1",
                                          style: { border: "none" },
                                          showArrow: false,

                                          label: (
                                            <div className="flex justify-between w-full px-2 py-1">
                                              <div className="flex gap-5">
                                                <div className="flex gap-2 justify-center m-auto">
                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "hidden"
                                                        : "block"
                                                    } mt-[13px]`}
                                                  >
                                                    <IconsArrowRight
                                                      height="1rem"
                                                      width="1rem"
                                                    ></IconsArrowRight>
                                                  </span>

                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "block"
                                                        : "hidden"
                                                    } mt-3`}
                                                  >
                                                    <IconArrowDown
                                                      height="1.3rem"
                                                      width="1.3rem"
                                                    ></IconArrowDown>
                                                  </span>

                                                  <h2 className="font-[600] text-[25px] text-gray-700 mt-[-1px]">
                                                    {" "}
                                                    Read Aloud
                                                  </h2>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-center m-auto  text-[20px]">
                                                  <Tag
                                                    className="m-auto text-[20px] flex justify-center px-1 py-1"
                                                    color="volcano"
                                                  >
                                                    production
                                                  </Tag>
                                                  <Tag
                                                    className="m-auto text-[20px] px-1 py-1"
                                                    color="cyan"
                                                  >
                                                    conversation
                                                  </Tag>
                                                </div>
                                              </div>

                                              <h2 className="bg-tahiti text-white rounded-md px-3 text-[22px] py-1 font-[600] drop-shadow-sm">{` ${Math.round(
                                                item.result
                                              )}%`}</h2>
                                            </div>
                                          ),
                                          children: (
                                            <div>
                                              <SALContainer
                                                audio={item.audioData}
                                                result={item.result}
                                                userAns={item.userAns}
                                                q={item.q}
                                              ></SALContainer>
                                            </div>
                                          ),
                                        },
                                      ]}
                                    />
                                  ) : (
                                    ""
                                  )}

                                  {item.inner_type === 51 ? (
                                    <Collapse
                                      accordion
                                      activeKey={openPanels}
                                      onChange={setOpenPanels}
                                      style={{
                                        border: "none",
                                        padding: "1rem",
                                      }}
                                      items={[
                                        {
                                          key: "1",
                                          style: { border: "none" },
                                          showArrow: false,
                                          label: (
                                            <div className="flex justify-between w-full px-2 py-1">
                                              <div className="flex gap-5">
                                                <div className="flex gap-2 justify-center m-auto">
                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "hidden"
                                                        : "block"
                                                    } mt-[13px]`}
                                                  >
                                                    <IconsArrowRight
                                                      height="1rem"
                                                      width="1rem"
                                                    ></IconsArrowRight>
                                                  </span>

                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "block"
                                                        : "hidden"
                                                    } mt-3`}
                                                  >
                                                    <IconArrowDown
                                                      height="1.3rem"
                                                      width="1.3rem"
                                                    ></IconArrowDown>
                                                  </span>

                                                  <h2 className="font-[600] text-[25px] text-gray-700 mt-[-1px]">
                                                    {" "}
                                                    Listen and Type
                                                  </h2>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-center m-auto  text-[20px]">
                                                  <Tag
                                                    className="m-auto text-[20px] flex justify-center px-1 py-1"
                                                    color="volcano"
                                                  >
                                                    conversation
                                                  </Tag>
                                                  <Tag
                                                    className="m-auto text-[20px] px-1 py-1"
                                                    color="cyan"
                                                  >
                                                    comprehension
                                                  </Tag>
                                                </div>
                                              </div>

                                              <h2 className="bg-tahiti text-white rounded-md px-3 text-[22px] py-1 font-[600] drop-shadow-sm">{` ${Math.round(
                                                item.result
                                              )}%`}</h2>
                                            </div>
                                          ),
                                          children: (
                                            <div>
                                              <LLTContainer
                                                q={item.q}
                                                userAns={item.userAns}
                                              ></LLTContainer>
                                            </div>
                                          ),
                                        },
                                      ]}
                                    />
                                  ) : (
                                    ""
                                  )}

                                  {item.inner_type === 21 ? (
                                    <Collapse
                                      accordion
                                      activeKey={openPanels}
                                      onChange={setOpenPanels}
                                      style={{
                                        border: "none",
                                        padding: "1rem",
                                      }}
                                      items={[
                                        {
                                          key: "1",
                                          style: { border: "none" },
                                          showArrow: false,
                                          label: (
                                            <div className="flex justify-between w-full px-2 py-1">
                                              <div className="flex gap-5">
                                                <div className="flex gap-2 justify-center m-auto">
                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "hidden"
                                                        : "block"
                                                    } mt-[13px]`}
                                                  >
                                                    <IconsArrowRight
                                                      height="1rem"
                                                      width="1rem"
                                                    ></IconsArrowRight>
                                                  </span>

                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "block"
                                                        : "hidden"
                                                    } mt-3`}
                                                  >
                                                    <IconArrowDown
                                                      height="1.3rem"
                                                      width="1.3rem"
                                                    ></IconArrowDown>
                                                  </span>

                                                  <h2 className="font-[600] text-[25px] text-gray-700 mt-[-1px]">
                                                    {" "}
                                                    Write about the Photo
                                                  </h2>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-center m-auto  text-[20px]">
                                                  <Tag
                                                    className="m-auto text-[20px] flex justify-center px-1 py-1"
                                                    color="volcano"
                                                  >
                                                    production
                                                  </Tag>
                                                  <Tag
                                                    className="m-auto text-[20px] px-1 py-1"
                                                    color="cyan"
                                                  >
                                                    literacy
                                                  </Tag>
                                                </div>
                                              </div>

                                              <h2 className="bg-tahiti text-white rounded-md px-3 text-[22px] py-1 font-[600] drop-shadow-sm">{` ${Math.round(
                                                item?.overAllResult?.overall
                                                  ? item?.overAllResult?.overall
                                                  : 0
                                              )}%`}</h2>
                                            </div>
                                          ),

                                          children: (
                                            <div>
                                              <WAPContainer
                                                data={item}
                                              ></WAPContainer>
                                            </div>
                                          ),
                                        },
                                      ]}
                                    />
                                  ) : (
                                    ""
                                  )}

                                  {item.inner_type === 32 ? (
                                    <Collapse
                                      accordion
                                      activeKey={openPanels}
                                      onChange={setOpenPanels}
                                      style={{
                                        border: "none",
                                        padding: "1rem",
                                      }}
                                      items={[
                                        {
                                          key: "1",

                                          style: { border: "none" },
                                          showArrow: false,
                                          label: (
                                            <div className="flex justify-between w-full px-2 py-1">
                                              <div className="flex gap-5">
                                                <div className="flex gap-2 justify-center m-auto">
                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "hidden"
                                                        : "block"
                                                    } mt-[13px]`}
                                                  >
                                                    <IconsArrowRight
                                                      height="1rem"
                                                      width="1rem"
                                                    ></IconsArrowRight>
                                                  </span>

                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "block"
                                                        : "hidden"
                                                    } mt-3`}
                                                  >
                                                    <IconArrowDown
                                                      height="1.3rem"
                                                      width="1.3rem"
                                                    ></IconArrowDown>
                                                  </span>

                                                  <h2 className="font-[600] text-[25px] text-gray-700 mt-[-1px]">
                                                    {" "}
                                                    Interactive Reading
                                                  </h2>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-center m-auto  text-[20px]">
                                                  <Tag
                                                    className="m-auto text-[20px] flex justify-center px-1 py-1"
                                                    color="volcano"
                                                  >
                                                    comprehension
                                                  </Tag>
                                                  <Tag
                                                    className="m-auto text-[20px] px-1 py-1"
                                                    color="cyan"
                                                  >
                                                    literacy
                                                  </Tag>
                                                </div>
                                              </div>

                                              <h2 className="bg-tahiti text-white rounded-md px-3 text-[22px] py-1 font-[600] drop-shadow-sm">{` ${Math.round(
                                                item.result
                                              )}%`}</h2>
                                            </div>
                                          ),
                                          children: (
                                            <div>
                                              <InteractiveContainer
                                                data={item}
                                              ></InteractiveContainer>
                                            </div>
                                          ),
                                        },
                                      ]}
                                    />
                                  ) : (
                                    ""
                                  )}

                                  {item.inner_type === 52 ? (
                                    <Collapse
                                      accordion
                                      activeKey={openPanels}
                                      onChange={setOpenPanels}
                                      style={{
                                        border: "none",
                                        padding: "1rem",
                                      }}
                                      items={[
                                        {
                                          key: "1",

                                          style: { border: "none" },
                                          showArrow: false,
                                          label: (
                                            <div className="flex justify-between w-full px-2 py-1">
                                              <div className="flex gap-5">
                                                <div className="flex gap-2 justify-center m-auto">
                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "hidden"
                                                        : "block"
                                                    } mt-[13px]`}
                                                  >
                                                    <IconsArrowRight
                                                      height="1rem"
                                                      width="1rem"
                                                    ></IconsArrowRight>
                                                  </span>

                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "block"
                                                        : "hidden"
                                                    } mt-3`}
                                                  >
                                                    <IconArrowDown
                                                      height="1.3rem"
                                                      width="1.3rem"
                                                    ></IconArrowDown>
                                                  </span>

                                                  <h2 className="font-[600] text-[25px] text-gray-700 mt-[-1px]">
                                                    {" "}
                                                    Interactive Listening
                                                  </h2>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-center m-auto  text-[20px]">
                                                  <Tag
                                                    className="m-auto text-[20px] flex justify-center px-1 py-1"
                                                    color="volcano"
                                                  >
                                                    comprehension
                                                  </Tag>
                                                  <Tag
                                                    className="m-auto text-[20px] px-1 py-1"
                                                    color="cyan"
                                                  >
                                                    conversation
                                                  </Tag>
                                                </div>
                                              </div>

                                              <h2 className="bg-tahiti text-white rounded-md px-3 text-[22px] py-1 font-[600] drop-shadow-sm">{` ${Math.round(
                                                item.result
                                              )}%`}</h2>
                                            </div>
                                          ),
                                          children: (
                                            <div>
                                              <LLIContainer
                                                data={item}
                                              ></LLIContainer>
                                            </div>
                                          ),
                                        },
                                      ]}
                                    />
                                  ) : (
                                    ""
                                  )}

                                  {item.inner_type === 22 ? (
                                    <Collapse
                                      accordion
                                      activeKey={openPanels}
                                      onChange={setOpenPanels}
                                      style={{
                                        border: "none",
                                        padding: "1rem",
                                      }}
                                      items={[
                                        {
                                          key: "1",

                                          style: { border: "none" },
                                          showArrow: false,
                                          label: (
                                            <div className="flex justify-between w-full px-2 py-1">
                                              <div className="flex gap-5">
                                                <div className="flex gap-2 justify-center m-auto">
                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "hidden"
                                                        : "block"
                                                    } mt-[13px]`}
                                                  >
                                                    <IconsArrowRight
                                                      height="1rem"
                                                      width="1rem"
                                                    ></IconsArrowRight>
                                                  </span>

                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "block"
                                                        : "hidden"
                                                    } mt-3`}
                                                  >
                                                    <IconArrowDown
                                                      height="1.3rem"
                                                      width="1.3rem"
                                                    ></IconArrowDown>
                                                  </span>

                                                  <h2 className="font-[600] text-[25px] text-gray-700 mt-[-1px]">
                                                    {" "}
                                                    Read then Write
                                                  </h2>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-center m-auto  text-[20px]">
                                                  <Tag
                                                    className="m-auto text-[20px] flex justify-center px-1 py-1"
                                                    color="volcano"
                                                  >
                                                    literacy
                                                  </Tag>
                                                  <Tag
                                                    className="m-auto text-[20px] px-1 py-1"
                                                    color="cyan"
                                                  >
                                                    production{" "}
                                                  </Tag>
                                                </div>
                                              </div>

                                              <h2 className="bg-tahiti text-white rounded-md px-3 text-[22px] py-1 font-[600] drop-shadow-sm">{` ${Math.round(
                                                item?.overAllResult?.overall
                                                  ? item?.overAllResult?.overall
                                                  : 0
                                              )}%`}</h2>
                                            </div>
                                          ),
                                          children: (
                                            <div>
                                              <WRWContainer
                                                data={item}
                                              ></WRWContainer>
                                            </div>
                                          ),
                                        },
                                      ]}
                                    />
                                  ) : (
                                    ""
                                  )}

                                  {item.inner_type === 44 ? (
                                    <Collapse
                                      accordion
                                      activeKey={openPanels}
                                      onChange={setOpenPanels}
                                      style={{
                                        border: "none",
                                        padding: "1rem",
                                      }}
                                      items={[
                                        {
                                          key: "1",

                                          style: { border: "none" },
                                          showArrow: false,
                                          label: (
                                            <div className="flex justify-between w-full px-2 py-1">
                                              <div className="flex gap-5">
                                                <div className="flex gap-2 justify-center m-auto">
                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "hidden"
                                                        : "block"
                                                    } mt-[13px]`}
                                                  >
                                                    <IconsArrowRight
                                                      height="1rem"
                                                      width="1rem"
                                                    ></IconsArrowRight>
                                                  </span>

                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "block"
                                                        : "hidden"
                                                    } mt-3`}
                                                  >
                                                    <IconArrowDown
                                                      height="1.3rem"
                                                      width="1.3rem"
                                                    ></IconArrowDown>
                                                  </span>

                                                  <h2 className="font-[600] text-[25px] text-gray-700 mt-[-1px]">
                                                    {" "}
                                                    Listen then Speak
                                                  </h2>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-center m-auto  text-[20px]">
                                                  <Tag
                                                    className="m-auto text-[20px] flex justify-center px-1 py-1"
                                                    color="volcano"
                                                  >
                                                    production
                                                  </Tag>
                                                  <Tag
                                                    className="m-auto text-[20px] px-1 py-1"
                                                    color="cyan"
                                                  >
                                                    conversation
                                                  </Tag>
                                                </div>
                                              </div>

                                              <h2 className="bg-tahiti text-white rounded-md px-3 text-[22px] py-1 font-[600] drop-shadow-sm">{` ${Math.round(
                                                item?.overAllResult?.overall
                                                  ? item?.overAllResult?.overall
                                                  : 0
                                              )}%`}</h2>
                                            </div>
                                          ),
                                          children: (
                                            <div>
                                              <SLSContainer
                                                data={item}
                                              ></SLSContainer>
                                            </div>
                                          ),
                                        },
                                      ]}
                                    />
                                  ) : (
                                    ""
                                  )}
                                  {item.inner_type === 42 ? (
                                    <Collapse
                                      accordion
                                      activeKey={openPanels}
                                      onChange={setOpenPanels}
                                      style={{
                                        border: "none",
                                        padding: "1rem",
                                      }}
                                      items={[
                                        {
                                          key: "1",

                                          style: { border: "none" },
                                          showArrow: false,
                                          label: (
                                            <div className="flex justify-between w-full px-2 py-1">
                                              <div className="flex gap-5">
                                                <div className="flex gap-2 justify-center m-auto">
                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "hidden"
                                                        : "block"
                                                    } mt-[13px]`}
                                                  >
                                                    <IconsArrowRight
                                                      height="1rem"
                                                      width="1rem"
                                                    ></IconsArrowRight>
                                                  </span>

                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "block"
                                                        : "hidden"
                                                    } mt-3`}
                                                  >
                                                    <IconArrowDown
                                                      height="1.3rem"
                                                      width="1.3rem"
                                                    ></IconArrowDown>
                                                  </span>
                                                  <h2 className="font-[600] text-[25px] text-gray-700 mt-[-1px]">
                                                    {" "}
                                                    Speak about the Photo
                                                  </h2>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-center m-auto  text-[20px]">
                                                  <Tag
                                                    className="m-auto text-[20px] flex justify-center px-1 py-1"
                                                    color="volcano"
                                                  >
                                                    production
                                                  </Tag>
                                                  <Tag
                                                    className="m-auto text-[20px] px-1 py-1"
                                                    color="cyan"
                                                  >
                                                    conversation
                                                  </Tag>
                                                </div>
                                              </div>

                                              <h2 className="bg-tahiti text-white rounded-md px-3 text-[22px] py-1 font-[600] drop-shadow-sm">{` ${Math.round(
                                                item?.overAllResult?.overall
                                                  ? item?.overAllResult?.overall
                                                  : 0
                                              )}%`}</h2>
                                            </div>
                                          ),

                                          children: (
                                            <div>
                                              <SAPContainer
                                                data={item}
                                              ></SAPContainer>
                                            </div>
                                          ),
                                        },
                                      ]}
                                    />
                                  ) : (
                                    ""
                                  )}

                                  {item.inner_type === 43 ? (
                                    <Collapse
                                      accordion
                                      activeKey={openPanels}
                                      onChange={setOpenPanels}
                                      style={{
                                        border: "none",
                                        padding: "1rem",
                                      }}
                                      items={[
                                        {
                                          key: "1",

                                          style: { border: "none" },
                                          showArrow: false,
                                          label: (
                                            <div className="flex justify-between w-full px-2 py-1">
                                              <div className="flex gap-5">
                                                <div className="flex gap-2 justify-center m-auto">
                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "hidden"
                                                        : "block"
                                                    } mt-[13px]`}
                                                  >
                                                    <IconsArrowRight
                                                      height="1rem"
                                                      width="1rem"
                                                    ></IconsArrowRight>
                                                  </span>

                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "block"
                                                        : "hidden"
                                                    } mt-3`}
                                                  >
                                                    <IconArrowDown
                                                      height="1.3rem"
                                                      width="1.3rem"
                                                    ></IconArrowDown>
                                                  </span>

                                                  <h2 className="font-[600] text-[25px] text-gray-700 mt-[-1px]">
                                                    {" "}
                                                    Read then Speak
                                                  </h2>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-center m-auto  text-[20px]">
                                                  <Tag
                                                    className="m-auto text-[20px] flex justify-center px-1 py-1"
                                                    color="volcano"
                                                  >
                                                    production
                                                  </Tag>
                                                  <Tag
                                                    className="m-auto text-[20px] px-1 py-1"
                                                    color="cyan"
                                                  >
                                                    conversation
                                                  </Tag>
                                                </div>
                                              </div>

                                              <h2 className="bg-tahiti text-white rounded-md px-3 text-[22px] py-1 font-[600] drop-shadow-sm">{` ${Math.round(
                                                item?.overAllResult?.overall
                                                  ? item?.overAllResult?.overall
                                                  : 0
                                              )}%`}</h2>
                                            </div>
                                          ),
                                          children: (
                                            <div>
                                              <SRSContainer
                                                data={item}
                                              ></SRSContainer>
                                            </div>
                                          ),
                                        },
                                      ]}
                                    />
                                  ) : (
                                    ""
                                  )}

                                  {item.inner_type === 23 ? (
                                    <Collapse
                                      accordion
                                      activeKey={openPanels}
                                      onChange={setOpenPanels}
                                      style={{
                                        border: "none",
                                        padding: "1rem",
                                      }}
                                      items={[
                                        {
                                          key: "1",

                                          style: { border: "none" },
                                          showArrow: false,
                                          label: (
                                            <div className="flex justify-between w-full px-2 py-1">
                                              <div className="flex gap-5">
                                                <div className="flex gap-2 justify-center m-auto">
                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "hidden"
                                                        : "block"
                                                    } mt-[13px]`}
                                                  >
                                                    <IconsArrowRight
                                                      height="1rem"
                                                      width="1rem"
                                                    ></IconsArrowRight>
                                                  </span>

                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "block"
                                                        : "hidden"
                                                    } mt-3`}
                                                  >
                                                    <IconArrowDown
                                                      height="1.3rem"
                                                      width="1.3rem"
                                                    ></IconArrowDown>
                                                  </span>

                                                  <h2 className="font-[600] text-[25px] text-gray-700 mt-[-1px]">
                                                    {" "}
                                                    Writing Sample
                                                  </h2>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-center m-auto  text-[20px]">
                                                  <Tag
                                                    className="m-auto text-[20px] flex justify-center px-1 py-1"
                                                    color="volcano"
                                                  >
                                                    production
                                                  </Tag>
                                                  <Tag
                                                    className="m-auto text-[20px] px-1 py-1"
                                                    color="cyan"
                                                  >
                                                    literacy
                                                  </Tag>
                                                </div>
                                              </div>

                                              <h2 className="bg-tahiti text-white rounded-md px-3 text-[22px] py-1 font-[600] drop-shadow-sm">{` ${Math.round(
                                                item?.overAllResult?.overall
                                                  ? item?.overAllResult?.overall
                                                  : 0
                                              )}%`}</h2>
                                            </div>
                                          ),
                                          children: (
                                            <div>
                                              <WSContainer
                                                data={item}
                                              ></WSContainer>
                                            </div>
                                          ),
                                        },
                                      ]}
                                    />
                                  ) : (
                                    ""
                                  )}

                                  {item.inner_type === 45 ? (
                                    <Collapse
                                      accordion
                                      activeKey={openPanels}
                                      onChange={setOpenPanels}
                                      style={{
                                        border: "none",
                                        padding: "1rem",
                                      }}
                                      items={[
                                        {
                                          key: "1",

                                          style: { border: "none" },
                                          showArrow: false,
                                          label: (
                                            <div className="flex justify-between w-full px-2 py-1">
                                              <div className="flex gap-5">
                                                <div className="flex gap-2 justify-center m-auto">
                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "hidden"
                                                        : "block"
                                                    } mt-[13px]`}
                                                  >
                                                    <IconsArrowRight
                                                      height="1rem"
                                                      width="1rem"
                                                    ></IconsArrowRight>
                                                  </span>

                                                  <span
                                                    className={`${
                                                      openPanels.length > 0
                                                        ? "block"
                                                        : "hidden"
                                                    } mt-3`}
                                                  >
                                                    <IconArrowDown
                                                      height="1.3rem"
                                                      width="1.3rem"
                                                    ></IconArrowDown>
                                                  </span>

                                                  <h2 className="font-[600] text-[25px] text-gray-700 mt-[-1px]">
                                                    {" "}
                                                    Speaking Sample
                                                  </h2>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-center m-auto  text-[20px]">
                                                  <Tag
                                                    className="m-auto text-[20px] flex justify-center px-1 py-1"
                                                    color="volcano"
                                                  >
                                                    production
                                                  </Tag>
                                                  <Tag
                                                    className="m-auto text-[20px] px-1 py-1"
                                                    color="cyan"
                                                  >
                                                    conversation
                                                  </Tag>
                                                </div>
                                              </div>

                                              <h2 className="bg-tahiti text-white rounded-md px-3 text-[22px] py-1 font-[600] drop-shadow-sm">{` ${Math.round(
                                                item?.overAllResult?.overall
                                                  ? item?.overAllResult?.overall
                                                  : 0
                                              )}%`}</h2>
                                            </div>
                                          ),
                                          children: (
                                            <div>
                                              <SSContainer
                                                data={item}
                                              ></SSContainer>
                                            </div>
                                          ),
                                        },
                                      ]}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
              <div class="flex h-[45%] w-[32%]">
                <div class="m-auto bg-[#e0e8f1] rounded-md w-full px-5 py-2">
                  <h2 className="text-[30px] font-poppinsBold font-[600]">
                    Estimated Score:
                  </h2>
                  <h2 className=" mt-5 text-[40px] font-[700]">
                    {estimatedResult}-{nextEstimatedResult}
                  </h2>
                  <div className="mt-5 font-poppins flex-col gap-5 justify-start text-[20px] font-[600]">
                    <h1>
                      Literacy:{" "}
                      <span className="font-poppinsBold">{literacy}</span>
                    </h1>
                    <h1>
                      Production:{" "}
                      <span className="font-poppinsBold">{production}</span>
                    </h1>
                    <h1>
                      Converstion:{" "}
                      <span className="font-poppinsBold">{conversation}</span>
                    </h1>
                    <h1>
                      Comprehension:{" "}
                      <span className="font-poppinsBold">{comprehension}</span>
                    </h1>
                  </div>
                 <div className="mt-5 m-auto w-full flex justify-center">
                 <Link to={`${LIVE_URL}duolingo/module/mock-test`} 
                  className=" px-5 text-[20px]  py-2 border-2 border-gray-600 mt-5 m-auto rounded-md">Test Another</Link>
                 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
