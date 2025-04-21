import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import AdditionalEmailCollect from "../PopUpInfoPage/AdditionalEmailCollect";
import AdditionalPhone from "../PopUpInfoPage/AdditionalPhone";
import AdditionalAddressCollect from "../PopUpInfoPage/AdditionalAddressCollet";
import AdditionalCurrentLevel from "../PopUpInfoPage/AdditionalCurrentLevel";
import AdditionalInterestedTest from "../PopUpInfoPage/AdditionalInterestedTest";
import AdditionalDesireScore from "../PopUpInfoPage/AdditionalDesireScore";
import { useDispatch, useSelector } from "react-redux";
import { saveUserProfileInfo } from "../../redux/slices/auth";

export default function PopUpinfoCollect({ collectInfo }) {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [show, isShow] = useState(false);
  const [sEmail, setSemail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [interestedTest, setInterestedTest] = useState("");
  const [desireScore, setDesireScore] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  let [index, setIndex] = useState(0);
  const [finishLine, setFinishLine] = useState(false);

  console.log(
    sEmail,
    phone,
    address,
    currentLevel,
    interestedTest,
    desireScore
  );

  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "40vw" };

  const containerList = [
    <AdditionalEmailCollect setSemail={setSemail}></AdditionalEmailCollect>,
    // <AdditionalPhone setPhone={setPhone}></AdditionalPhone>,
    <AdditionalAddressCollect
      address={address}
      setAddress={setAddress}
    ></AdditionalAddressCollect>,
    <AdditionalCurrentLevel
      cLevel={currentLevel}
      setClevel={setCurrentLevel}
    ></AdditionalCurrentLevel>,
    <AdditionalInterestedTest
      interestedTest={interestedTest}
      setinterestedTest={setInterestedTest}
    ></AdditionalInterestedTest>,
    <AdditionalDesireScore
      ds={desireScore}
      setDS={setDesireScore}
    ></AdditionalDesireScore>,
  ];

  const handleNextBtn = () => {
    setIndex(++index);
    if (index === 4) {
      setFinishLine(true);
    }
  };

  const handleFinish = async () => {
    localStorage.setItem("statepu", 2);
    isShow(false);
    const data = {
      id: userInfo.id,
      s_email: sEmail,
      phone: phone,
      address,
      extra_info: {
        itp: interestedTest,
        cLevel: currentLevel,
        ds: desireScore,
      },
    };

    dispatch(saveUserProfileInfo(data));
  };

  useEffect(() => {
    const data = localStorage.getItem("statepu");
    if (data === "1") {
      isShow(true);
      localStorage.setItem("statepu", 2);
    } else {
      isShow(false);
    }
  }, []);

 

  return (
    <div>
      <Modal
        style={config}
        footer={null}
        maskClosable={false}
        closable={false}
        width="md:w-[90%] sm:w-full"
        open={show}
        className=" top-[10rem] m-auto z-10 "
      >
        <div>
          <div className="h-auto ">
            {containerList[index]}
            <div className="mt-10 w-full flex justify-end">
              {finishLine ? (
                <button
                  onClick={handleFinish}
                  className="bg-[#3AB7BF] px-4 py-2 rounded-md text-white"
                >
                  Finish
                </button>
              ) : (
                <button
                  onClick={handleNextBtn}
                  className="bg-[#3AB7BF] px-4 py-2 rounded-md text-white"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
