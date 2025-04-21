import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Voc from "./ModulePage/Vocabulary/Voc";
import RCPage from "./ModulePage/Reading/RCPage";
import SALpage from "./ModulePage/Speaking/SALpage";
import LLTPage from "./ModulePage/Listening/LLTPage";
import { Modal, Progress } from "antd";
import { Statistic } from "antd";
import { clearMockTestUserInput } from "../../redux/slices/mockTest";
import WAPPage from "./ModulePage/Writing/WAPPage";
import PrepTime from "./ModulePage/Reading/PrepTime";
import Interactive from "./ModulePage/Reading/Interactive";
import LLIpage from "./ModulePage/Listening/LLIpage";
import LliSummaryBox from "./ModulePage/Listening/LliSummaryBox";
import WRWPage from "./ModulePage/Writing/WRWPage";
import SAPPage from "./ModulePage/Speaking/SAPPage";
import SRSPage from "./ModulePage/Speaking/SRSPage";
import SLSPage from "./ModulePage/Speaking/SLSPage";
import WSPage from "./ModulePage/Writing/WSPage";
import SSPage from "./ModulePage/Speaking/SSPage";
import MockTestComplete from "./MockTestComplete";
import { Link, useNavigate } from "react-router-dom";
import { LIVE_URL } from "../../config";
import RFPage from "./ModulePage/Reading/RFPage";
const { Countdown } = Statistic;

export default function MockTestPage({ currentSection, handleNextSection }) {
  const dispatch = useDispatch();

  const [currentQuestion, setcurrentQuestion] = useState(currentSection);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  let [current, setCurrent] = useState(0);
  const [deadLine, setDeadline] = useState(0);
  const [sectionView, setSectionView] = useState(1);
  const [timesup, setTimesUp] = useState(false);
  const [startTest, setStartTest] = useState(true);
  const navigate = useNavigate();
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };

  const handleNextQuestion = () => {
    setCurrent(++current);
  };

  useEffect(() => {
    if (startTest) {
      if (current < currentSection.length) {
        setcurrentQuestion(currentSection[current]);
        setDeadline(0);
      } else {
        handleNextSection();
        setTimeout(() => {
          setCurrent(0);
        }, 1000);
      }
    }
  }, [current, startTest]);

  const setTheCustomDeadLine = (data) => {
    setDeadline(Date.now() + data * 60000);
  };

  const handleEstimateScoreResultPage = () => {
    setSectionView(2);
    // setCurrent(-1)
  };

  const handleQuitMockTest = () => {
    navigate(`/`);
  };
  const startMockTest = () => {
    setStartTest(true);
    dispatch(clearMockTestUserInput());
  };

  console.log(currentSection);
  return (
    <div class="flex h-screen">
      <div class="m-auto">
        <Modal
          style={config}
          footer={null}
          maskClosable={false}
          closable={false}
          width="md:w-[60%] sm:[80%]"
          open={!startTest}
          className="px-2 py-2 top-[5rem] flex justify-center m-auto z-10"
        >
          <div>
            <h1 className="text-[25px] font-[700] font-poppinsBold text-center text-red-400">
              Following Rules are Considered for Mock Test
            </h1>

            <div className="text-justify text-[20px] mt-10 sm:w-full md:w-[70%] m-auto flex-col justify-center font-montserrat">
              <ul className="list-disc space-y-1 text-justify ">
                <li>Give Audio Recording Permission</li>
                <li>
                  Keep mobile devices, notes, and textbooks away from the
                  testing area.
                </li>
                <li>Look at the device screen at all times during the test.</li>
                <li>Stay in the test window at all times.</li>
                <li>Avoid writing or reading notes.</li>
                <li>Speak only when instructed.</li>
              </ul>
            </div>
            <div className="mt-10">
              <div className="w-full flex justify-end gap-5">
                <Link
                  to={`${LIVE_URL}duolingo/module/mock-test`}
                  className="px-5 text-[20px]  py-1 border-2 border-gray-600 mt-5 rounded-md"
                >
                  Exit
                </Link>
                <button
                  onClick={startMockTest}
                  className="px-5 text-[20px]  py-1 border-2 border-gray-600 mt-5 rounded-md"
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        </Modal>
        {/* <h1 className="text-center px-2 py-2 text-[30px] font-poppins font-[700]">
          Mock Test
        </h1> */}
        <div
          id="journal-scroll"
          className={`${
            sectionView === 1 ? "block" : "hidden"
          } h-auto md:w-[70rem] sm:w-full drop-shadow-sm bg-white rounded-md overflow-y-scroll`}
        >
          {/* <div className="w-full flex justify-end px-2 py-[1rem]">
            <div
              className="ml-1 font-[700] text-[20px] bg-[#DDE9F8] w-min px-2 py-1
                rounded-md md:relative sm:fixed sm:right-0  md:mt-0"
            >
              <Countdown
                onChange={(e) => (e <= 60000 ? setTimeDanger(true) : "")}
                valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
                value={deadLine }
                onFinish={handleTimeFinish}
                format="mm:ss"
              />
            </div>
          </div> */}
          {/* section One */}
          <div>
            {currentQuestion.inner_type === 11 ? (
              <Voc
                handleNextQuestion={handleNextQuestion}
                data={currentQuestion}
                setDeadline={setTheCustomDeadLine}
                timesup={timesup}
              ></Voc>
            ) : currentQuestion.inner_type === 31 ? (
              <RCPage
                handleNextQuestion={handleNextQuestion}
                data={currentQuestion}
                setDeadline={setTheCustomDeadLine}
                timesup={timesup}
              ></RCPage>
            ) : currentQuestion.inner_type === 33 ? (
              <RFPage
                handleNextQuestion={handleNextQuestion}
                data={currentQuestion}
                setDeadline={setTheCustomDeadLine}
                timesup={timesup}
              ></RFPage>
            ): currentQuestion.inner_type === 32 ? (
              <Interactive
                handleNextQuestion={handleNextQuestion}
                data={currentQuestion}
                setDeadline={setTheCustomDeadLine}
                timesup={timesup}
              ></Interactive>
            ) : currentQuestion.inner_type === 41 ? (
              <SALpage
                handleNextQuestion={handleNextQuestion}
                data={currentQuestion}
                setDeadline={setTheCustomDeadLine}
                timesup={timesup}
              ></SALpage>
            ) : currentQuestion.inner_type === 42 ? (
              <SAPPage
                handleNextQuestion={handleNextQuestion}
                data={currentQuestion}
                setDeadline={setTheCustomDeadLine}
                timesup={timesup}
              ></SAPPage>
            ) : currentQuestion.inner_type === 43 ? (
              <SRSPage
                handleNextQuestion={handleNextQuestion}
                data={currentQuestion}
                setDeadline={setTheCustomDeadLine}
                timesup={timesup}
              ></SRSPage>
            ) : currentQuestion.inner_type === 44 ? (
              <SLSPage
                handleNextQuestion={handleNextQuestion}
                data={currentQuestion}
                setDeadline={setTheCustomDeadLine}
                timesup={timesup}
              ></SLSPage>
            ) : currentQuestion.inner_type === 45 ? (
              <SSPage
                handleNextQuestion={handleEstimateScoreResultPage}
                data={currentQuestion}
                setDeadline={setTheCustomDeadLine}
                timesup={timesup}
              ></SSPage>
            ) : currentQuestion.inner_type === 51 ? (
              <LLTPage
                handleNextQuestion={handleNextQuestion}
                data={currentQuestion}
                setDeadline={setTheCustomDeadLine}
                timesup={timesup}
              ></LLTPage>
            ) : currentQuestion.inner_type === 52 ? (
              <LLIpage
                handleNexOne={handleNextQuestion}
                data={currentQuestion}
                setDeadline={setTheCustomDeadLine}
                timesup={timesup}
              ></LLIpage>
            ) : currentQuestion.inner_type === 521 ? (
              <LliSummaryBox
                handleNextQuestion={handleNextQuestion}
                data={currentQuestion}
                setDeadline={setTheCustomDeadLine}
                timesup={timesup}
              ></LliSummaryBox>
            ) : currentQuestion.inner_type === 21 ? (
              <WAPPage
                handleNextQuestion={handleNextQuestion}
                data={currentQuestion}
                setDeadline={setTheCustomDeadLine}
                timesup={timesup}
              ></WAPPage>
            ) : currentQuestion.inner_type === 22 ? (
              <WRWPage
                handleNextQuestion={handleNextQuestion}
                data={currentQuestion}
                setDeadline={setTheCustomDeadLine}
                timesup={timesup}
              ></WRWPage>
            ) : currentQuestion.inner_type === 23 ? (
              <WSPage
                handleNextQuestion={handleNextQuestion}
                data={currentQuestion}
                setDeadline={setTheCustomDeadLine}
                timesup={timesup}
              ></WSPage>
            ) : currentQuestion.inner_type === 101 ? (
              <PrepTime
                handleNextQuestion={handleNextQuestion}
                data={currentQuestion}
              ></PrepTime>
            ) : (
              ""
            )}
          </div>
        </div>

        <div
          className={`${
            sectionView === 2 ? "block" : "hidden"
          } h-screen w-screen`}
        >
          <MockTestComplete
            showEv={sectionView === 2 ? true : false}
          ></MockTestComplete>
        </div>
        <button onClick={() => dispatch(clearMockTestUserInput())}>
          clear
        </button>
        {/* 
        <button onClick={() => dispatch(clearMockTestUserInput())}>
          clear
        </button> */}
        {/* <button className={`${sectionView===1 ?'block':'hidden'} px-5 text-[20px]  py-2 border-2 border-gray-600 mt-5 rounded-md`}
          onClick={ handleQuitMockTest}>
         Quit From Mock Test
        </button> */}
      </div>
    </div>
  );
}
