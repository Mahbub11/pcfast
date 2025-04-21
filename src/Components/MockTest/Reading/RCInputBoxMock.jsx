import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Tick } from "../../../Assets/SVG/tick.svg";
import InputBox from "../../Reading/InputBox";

export default function RCInputBoxMock({
  ansWer,
  indexNumber,
  gap,
  starter,
  userAns
}) {
  const dispatch = useDispatch();
  const [val, setVal] = useState({});
  const [isActive, setActive] = useState(false);

  console.log(userAns)


  const { visibility } = useSelector((state) => state.fillgap);
  const [gapL, setGapL] = useState(ansWer.trim().length - userAns[indexNumber]?.length)

  const gapChar = (e) => {

    const { name, value } = e.target;
    setActive(true);
    const newVal = value.toLowerCase().trim();
    setVal(prev => {
      return { ...prev, [name]: (newVal) };
    });

    //   setVal((prev) => prev ,[name]: newVal );
  };
  // useEffect(() => {
  //   setVal(starter);
  // }, [visibility]);

  // useEffect(() => {

  //   dispatch(
  //     saveUserInput({
  //       [indexNumber]: starter+Object.values(val).join(''),
  //     })
  //   );
  //   setActive(false);
  // }, [isActive]);

  console.log(gapL)


  return (
    <div className="flex flex-col h-[2rem]">
      <p
        className={`${visibility ? "visible" : "hidden"
          } text-[15px] font-robotomono font[500]
      text-red-500 absolute mt-[-1.5rem] `}
      >
        {ansWer.trim() === userAns[indexNumber] ? <div className="mt-3"><Tick></Tick></div> : ansWer}
      </p>
      <div className="flex gap-1 ">
        {userAns[indexNumber]?.split("").map((val) => (
          <input
            disabled
            value={val}
            className="bg-gray-100 md:w-[2.2rem] md:h-[25px] md:mt-[8px] sm:w-7 
             px-2 rounded-md text-center shadow-sm "
          ></input>
        ))}

        {
          Array.from(
            { length: gapL },
            (_, i) => (
              <InputBox gapChar={gapChar}></InputBox>
            )
          )


        }


      </div>
    </div>
  );
}
