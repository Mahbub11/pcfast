import { useEffect, useState } from "react";
import { Progress, Skeleton, Collapse, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbackResult } from "../../redux/slices/gptAssmentResult";
import { EditHolder } from "./EditorHolder";
import { UserInputLengthWS } from "../../utils/HelperFunction";
import { getWordDetails } from "../../redux/slices/disctionary";
import { saveStatData } from "../../redux/slices/statistic";
import { Link } from "react-router-dom";

export const AssesmentContainer = ({
  userAns,
  sampleAns,
  isfluency = false,
  handleFeedbackState,
  feedbackState,
  qData,
}) => {
  const dispatch = useDispatch();
  const [ga, setga] = useState({});
  const [gc, setgc] = useState({});
  const [ls, setls] = useState({});
  const [ld, setld] = useState({});
  const [fluency, setFluency] = useState(0);
  const [length, setLength] = useState(0);
  const [tr, settr] = useState(0);
  const [overall, setOverall] = useState(0);
  const { statistic, loading, isSubscriptionRequired } = useSelector(
    (state) => state.gptAssmentResult
  );
  const { userInfo } = useSelector((state) => state.auth);
  const [loadingStep, setLoadingStep] = useState(20);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "70vw" };

  useEffect(() => {
    if (isSubscriptionRequired) {
      console.log("reacheddd");
    }
  }, [isSubscriptionRequired]);
  useEffect(() => {
    if (!statistic) return;
    const data = statistic[0];
    settr(data?.tr);
    setga(data?.ga);
    setgc(data?.gc);
    setls(data?.ls);
    setld(data?.ld);
    setFluency(data?.fluency);

    console.log("UseAns" + userAns);
    const getLength = UserInputLengthWS(userAns);
    setLength(getLength);
    if (isfluency) {
      const calculateOverall =
        (parseInt(data?.tr?.value) +
          parseInt(data?.ga?.value) +
          parseInt(data?.gc?.value) +
          parseInt(data?.ls?.value) +
          parseInt(data?.ld?.value) +
          parseInt(data?.fluency?.value)) /
        6;

      setOverall(Math.round(calculateOverall));
      const statData = {
        user: userInfo.id,
        qn: qData.id,
        level: qData.level,
        type: qData.type,
        inner_type: qData.inner_type,
        time: qData.time,
        result: Math.round(calculateOverall),
      };
      dispatch(saveStatData(statData));
    } else {
      const calculateOverall =
        (parseInt(data?.tr?.value) +
          parseInt(data?.ga?.value) +
          parseInt(data?.gc?.value) +
          parseInt(data?.ls?.value) +
          parseInt(data?.ld?.value) +
          parseInt(getLength)) /
        6;

      setOverall(Math.round(calculateOverall));
      const statData = {
        user: userInfo.id,
        qn: qData.id,
        level: qData.level,
        type: qData.type,
        inner_type: qData.inner_type,
        time: qData.time,
        result: Math.round(calculateOverall),
      };
      dispatch(saveStatData(statData));
    }
  }, [statistic]);

  useEffect(() => {
    if (loading) {
      setLoadingStep(40);
    } else {
      setLoadingStep(100);
    }
  }, [loading]);

  const interActiveFeedback = (key) => {
    if (feedbackState) {
      dispatch(getFeedbackResult(userAns));
    }
    handleFeedbackState(false);
  };

  const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
  };

  return (
    <div>
      <div className="w-full">
        <div className="flex justify-center m-auto">
          <Modal
            style={config}
            footer={null}
            // onCancel={() => setPurchaseReqModal(false)}
            open={isSubscriptionRequired}
            className=" top-[5rem] m-auto z-10"
          >
            <div>
              <div className="">
                <h1 className="text-yellow-600 font-poppins font-[600] text-[20px] text-center">
                  Account Upgrade Required!
                </h1>

                <p className="mt-3 text-[15px] font-montserrat text-center">
                  You Have used 20 free AI Evaluation on Pactice Test! <br></br>
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

        {loading ? (
          <div className="mt-5">
            <Progress
              className="flex justify-center"
              showInfo={false}
              steps={15}
              percent={loadingStep}
              size={[13, 18]}
              strokeColor="#a2c0e3"
              trailColor="rgba(0, 0, 0, 0.06)"
            />
            <h2 className="text-[17px] font-[700] font-opensans text-center text-blue-400">
              Analyzing{" "}
            </h2>
          </div>
        ) : (
          <div className="md:w-[60rem] mt-5">
            <div
              className="flex md:flex-row sm:flex-col justify-between gap-5 m-auto  mt-5 
                w-full text-[25px] sm:text-[20px] font-[500] 
             font-montserrat  text-gray-700"
            >
              <div className="flex justify-center m-auto">
                <div className="flex flex-col md:gap-5 px-1 py-1 h-full">
                  <div className="flex flex-col items-center ml-3  mt-[50px] justify-center gap-3 w-[10rem] h-[5rem] m-auto">
                    <Progress
                      className="m-auto"
                      type="dashboard"
                      percent={Math.floor(overall)}
                      strokeLinecap="square"
                      status="active"
                      trailColor="#DDE9F8"
                      size={100}
                      strokeColor="#103f5eb3"
                      strokeWidth={13}
                    />
                    <h1 className="text-center font-[500] font-montserrat">
                      Ovar all
                    </h1>
                  </div>
                  <div className="mt-5 drop-shadow-sm">
                    <Progress
                      className="text-[18px] font-[600] font-poppins flex flex-col gap-5  items-center"
                      strokeLinecap="square"
                      strokeColor="#103f5eb3"
                      trailColor="#DDE9F8"
                      percent={overall}
                      format={(percent) =>
                        `${Math.round((percent / 100) * 160)} -160`
                      }
                      size="default"
                      status="active"
                      strokeWidth={10}
                    />
                  </div>
                </div>
              </div>

              <div
                className="
             m-auto md:px-2 md:py-2 rounded-md grid md:grid-cols-3 gap-2
             sm:grid-cols-2 mt-3 sm:text-[12px]"
              >
                <div className="flex flex-col justify-center gap-3 md:w-[10rem]  m-auto">
                  <Progress
                    className="m-auto"
                    type="dashboard"
                    strokeLinecap="square"
                    status="active"
                    trailColor="#DDE9F8"
                    strokeColor="#103f5eb3"
                    percent={ga?.value}
                    size={65}
                    strokeWidth={10}
                  />
                  <h1 className="text-center font-[500] font-montserrat">
                    Grammatical accuracy
                  </h1>
                </div>
                <div className="flex flex-col justify-center gap-3 md:w-[10rem] h-auto m-auto">
                  <Progress
                    className="m-auto"
                    type="dashboard"
                    strokeLinecap="square"
                    status="active"
                    trailColor="#DDE9F8"
                    strokeColor="#103f5eb3"
                    percent={Math.floor(gc?.value)}
                    size={65}
                    strokeWidth={10}
                  />
                  <h1 className="text-center font-[500] font-montserrat">
                    Grammatical complexity
                  </h1>
                </div>
                <div className="flex flex-col justify-center gap-3 md:w-[10rem] h-auto m-auto">
                  <Progress
                    className="m-auto"
                    type="dashboard"
                    strokeLinecap="square"
                    status="active"
                    trailColor="#DDE9F8"
                    strokeColor="#103f5eb3"
                    percent={Math.floor(ls?.value)}
                    size={65}
                    strokeWidth={10}
                  />
                  <h1 className="text-center font-[500] font-montserrat">
                    Lexical sophistication
                  </h1>
                </div>
                <div className="flex flex-col justify-center gap-3 md:w-[10rem] mt-[27px] h-auto m-auto">
                  <Progress
                    className="m-auto"
                    type="dashboard"
                    strokeLinecap="square"
                    status="active"
                    trailColor="#DDE9F8"
                    strokeColor="#103f5eb3"
                    percent={Math.floor(ld?.value)}
                    size={65}
                    strokeWidth={10}
                  />
                  <h1 className="text-center font-[500] font-montserrat">
                    Lexical diversity
                  </h1>
                </div>
                <div className="flex flex-col justify-center gap-3 md:w-[10rem] h-auto m-auto">
                  <div
                    className={`${
                      isfluency ? "hidden" : "block"
                    } flex flex-col justify-center`}
                  >
                    <Progress
                      className="m-auto"
                      type="dashboard"
                      strokeLinecap="square"
                      status="active"
                      trailColor="#DDE9F8"
                      strokeColor="#103f5eb3"
                      percent={length}
                      size={65}
                      strokeWidth={10}
                    />
                    <h1 className="text-center font-[500] font-montserrat">
                      Length
                    </h1>
                  </div>
                  <div
                    className={`${
                      isfluency ? "block" : "hidden"
                    } flex flex-col justify-center mt-5`}
                  >
                    <Progress
                      className="m-auto"
                      type="dashboard"
                      strokeLinecap="square"
                      status="active"
                      trailColor="#DDE9F8"
                      strokeColor="#103f5eb3"
                      percent={Math.floor(fluency?.value)}
                      size={65}
                      strokeWidth={10}
                    />
                    <h1 className="text-center font-[500] font-montserrat">
                      Fluency
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-3 md:w-[10rem] h-auto m-auto">
                  <Progress
                    className="m-auto"
                    type="dashboard"
                    strokeLinecap="square"
                    status="active"
                    trailColor="#DDE9F8"
                    strokeColor="#103f5eb3"
                    percent={Math.floor(tr?.value)}
                    size={65}
                    strokeWidth={10}
                  />
                  <h1 className="text-center font-[500] font-montserrat">
                    Task relevance
                  </h1>
                </div>
              </div>
            </div>

            <div className="sm:mt-10 md:mt-10 w-full">
              <div className="h-auto w-full m-auto flex-col gap-5">
                <Collapse
                  style={{ backgroundColor: "#DDE9F8" }}
                  accordion
                  items={[
                    {
                      key: "2",
                      label: "Statistic Explanations",
                      children: (
                        <p className="text-[15px] font-poppins h-auto px-1 flex flex-wrap gap-1">
                          <div>
                            <p>
                              <span className="font-[700] text-tahiti">
                                Task Relevance: {""}
                              </span>
                              {tr?.recommendation}
                            </p>
                          </div>
                          <div>
                            <p>
                              <span className="font-[700] text-tahiti">
                                Grammatical accuracy: {""}
                              </span>
                              {ga?.recommendation}
                            </p>
                          </div>

                          <div>
                            <p>
                              <span className="font-[700] text-tahiti">
                                Grammatical complexity: {""}
                              </span>
                              {gc?.recommendation}
                            </p>
                          </div>

                          <div>
                            <p>
                              <span className="font-[700] text-tahiti">
                                Lexical sophistication: {""}
                              </span>
                              {ls?.recommendation}
                            </p>
                          </div>
                          <div>
                            <p>
                              <span className="font-[700] text-tahiti">
                                Lexical diversity: {""}
                              </span>
                              {ld?.recommendation}
                            </p>
                          </div>
                        </p>
                      ),
                    },
                  ]}
                />

                <div className="">
                  <Collapse
                    style={{ backgroundColor: "#DDE9F8" }}
                    onChange={interActiveFeedback}
                    className="mt-2"
                    accordion
                    items={[
                      {
                        key: "1",
                        label: "Writing Interactive Feedback",
                        children: <div>{<EditHolder></EditHolder>}</div>,
                      },
                    ]}
                  />

                  <div className="h-auto w-full m-auto mt-2">
                    <Collapse
                      style={{ backgroundColor: "#DDE9F8" }}
                      accordion
                      items={[
                        {
                          key: "1",
                          label: "Sample Answer",
                          children: (
                            <p className=" text-[17px] font-poppins h-auto px-1 flex flex-wrap gap-1">
                              {sampleAns.split(" ").map((val) => (
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
