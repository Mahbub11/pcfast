import { Skeleton, Statistic, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import PracticePageRCI from "../PracticeReading/PracticePageRCI";
import PracticePageRCP from "../PracticeReading/PracticePageRCP";
import PracticePageRCS from "../PracticeReading/PracticePageRCS";
import PracticePageRGP from "../PracticeReading/PracticePageRGP";
import PracticePageRHA from "../PracticeReading/PracticePageRHA";
import PracticePageRHA2 from "../PracticeReading/PracticePageRHA2";

import { toggleBookmark } from "../../redux/slices/bookmark";
import {
  DisableVisibility,
  ToggleVisibility,
} from "../../redux/slices/fillgap";
import {
  cleanUserReadingInput,
  cleanUserReadingResult,
  SaveRCSResult,
} from "../../redux/slices/readingInput";
import { saveStatData } from "../../redux/slices/statistic";

import IconCross from "../../Assets/SVG/IconCross";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const { Countdown } = Statistic;

export default function InteractiveReadingPracticeContainer() {
  const { rid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(true);
  const [showEvaluateBtn, setShowEvaluateBtn] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(true);
  const [showPreviousBtn, setShowPreviousBtn] = useState(false);
  const [counter, setCounter] = useState(false);
  const [deadline, setDeadline] = useState(2);
  const [timeDanger, setTimeDanger] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [data, setData] = useState({});
  const [pages, setPages] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);
  const { listInteractive } = useSelector((state) => state.getReadingList);
  const { userInput } = useSelector((state) => state.fillgap);
  const { resultRCS, resultRCP, resultRHA, resultRHA2, resultRGP, resultRCI } =
    useSelector((state) => state.readingInput);

  useEffect(() => {
    const qData = listInteractive.find((val) => val.index === parseInt(rid));
    if (!qData) return;

    dispatch(cleanUserReadingInput());
    dispatch(cleanUserReadingResult());
    dispatch(DisableVisibility());

    setData(qData);
    setDeadline(Date.now() + qData.time * 60000);
    setBookmark(qData.bookmark || false);

    const STEP_ORDER = [321, 322, 323, 324, 325, 326];
    const sortedReadings = STEP_ORDER.map((type) =>
      qData.interactivereadings.find((item) => item.inner_type === type)
    ).filter(Boolean);

    const typeComponents = sortedReadings.map((val, i) => {
      switch (val.inner_type) {
        case 322:
          return <PracticePageRCP data={val} key={`322-${i}`} />;
        case 321:
          return <PracticePageRCS data={val} index={index} key={`321-${i}`} />;
        case 323:
          return <PracticePageRCI data={val} key={`323-${i}`} />;
        case 324:
          return <PracticePageRHA data={val} index={index} key={`324-${i}`} />;
        case 325:
          return <PracticePageRGP data={val} key={`325-${i}`} />;
        case 326:
          return <PracticePageRHA2 data={val} index={index} key={`326-${i}`} />;
        default:
          return null;
      }
    });

    setPages(typeComponents);
    setIndex(0);
    setCounter(false);
    setShowEvaluateBtn(false);
    setShowNextBtn(true);
    setShowPreviousBtn(false);

    setTimeout(() => setBusy(false), 1000);
  }, [rid]);

  // Bookmark handler
  const handleBookmark = () => {
    setBookmark((prev) => !prev);
    dispatch(
      toggleBookmark({
        id: data.id,
        type: data.type,
        inner_type: data.inner_type,
      })
    );
  };

  const handleEvaluate = () => {
    setDeadline(null);
    dispatch(ToggleVisibility());
    setShowEvaluateBtn(false);
    setShowNextBtn(false);
    setShowPreviousBtn(true);
    setCounter(true);

    const readingResult =
      parseInt(resultRCS?.result || 0) +
      parseInt(resultRCP?.result || 0) +
      parseInt(resultRHA?.result || 0) +
      parseInt(resultRHA2?.result || 0) +
      parseInt(resultRGP?.result || 0) +
      parseInt(resultRCI?.result || 0);

    dispatch(
      saveStatData({
        user: userInfo.id,
        qn: data.id,
        level: data.level,
        type: data.type,
        inner_type: data.inner_type,
        time: data.time,
        result: readingResult / 6,
      })
    );
  };

  const handleNext = () => {
    if (index < pages.length - 1) {
      setIndex((prev) => prev + 1);
      setShowPreviousBtn(true);

      if (index === 0 && data.interactivereadings[0].inner_type === 321) {
        const correct = data.interactivereadings[0].qa.a.filter(
          (val, i) => userInput[i] === val
        ).length;
        const total = data.interactivereadings[0].qa.a.length;
        dispatch(
          SaveRCSResult({
            result: ((correct / total) * 100).toFixed(2),
          })
        );
      }
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const handleQNav = (dir) => {
    const nextId = parseInt(rid) + dir;
    if (listInteractive.some((q) => q.index === nextId)) {
      setBusy(true);
      navigate(`/practice/ri-r/${nextId}`);
    }
  };

  const openNotification = () => {
    notification.open({
      message: `Time's Up`,
      placement: "top",
      type: "warning",
      style: { border: "2px solid red" },
    });
  };

  return (
    <div>
      {busy ? (
        <Skeleton />
      ) : (
        <div className="h-auto w-full flex flex-col justify-between bg-transparent">
          <div className="bg-[#fffffff7] px-4 py-5">
            <div className="md:flex md:flex-row sm:flex sm:flex-col justify-between m-auto w-full mt-5 ">
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
                  {bookmark ? (
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
            <div>{pages[index]}</div>

            <div className="flex justify-end mt-5">
              {/* <div className="mt-2 text-center text-sm font-medium">
                Question {index + 1} of {pages.length}
              </div> */}
              <div className="flex gap-3">
                {/* Previous: Show after evaluation */}
                {counter && (
                  <button
                    className="px-5 py-3 bg-home rounded-md text-gray-800 font-semibold"
                    onClick={handlePrevious}
                    disabled={index === 0}
                    style={{ opacity: index === 0 ? 0.5 : 1 }}
                  >
                    Previous
                  </button>
                )}

                {/* Evaluate: Show only on last question before evaluation */}
                {!counter && index === pages.length - 1 && (
                  <button
                    className="px-6 py-3 bg-home rounded-md text-gray-800 font-semibold"
                    onClick={handleEvaluate}
                  >
                    Evaluate
                  </button>
                )}

                {/* Next: Show before evaluation, or after evaluation */}
                {(counter || (!counter && index < pages.length - 1)) && (
                  <button
                    className="px-5 py-3 bg-home rounded-md text-gray-800 font-semibold"
                    onClick={handleNext}
                    disabled={counter && index === pages.length - 1}
                    style={{
                      opacity: counter && index === pages.length - 1 ? 0.5 : 1,
                    }}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
            <div className="border-b-2  mt-3 border-[#3ab6bf5f]"></div>

            <div className="flex items-center gap-3 mt-5 justify-center">
              <span className="cursor-pointer" onClick={() => handleQNav(-1)}>
                {" "}
                <IconsArrowLeft width="1rem" height="1rem" />
              </span>
              <span className="border-[2px] text-[20px] font-[600] border-[#3AB7BF] px-2 py-2 rounded-md">
                {rid}
              </span>

              <span className="cursor-pointer" onClick={() => handleQNav(1)}>
                <IconsArrowRight width="1rem" height="1rem" />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
