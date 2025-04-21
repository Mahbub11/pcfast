import React, { useEffect, useImperativeHandle, useState } from "react";
import { Radio, Select, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./selectBox.css";
import { ReactComponent as Tick } from "../../../../Assets/SVG/tick.svg";
const { Option } = Select;

export default function SelectBoxMock({ value, ansWer, indexNumber,userAns }) {
  const [selected, setSelected] = useState([]);

  const { userInput } = useSelector((state) => state.fillgap);
  const { visibility } = useSelector((state) => state.fillgap);
  const { common } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const doc = value.split("*");
  const options = [];
  doc[1].split("-").map((val, index) => {
    options.push({
      value: val,
      label: val,
    });
  });

  return (
    <div
      className={`${
        visibility ? "px-2 py-[0.25rem] rounded-md leading-[3.5rem]" : ""
      } font-[23px] mt-[-6px] px-1 py-1`}
    >
      <p
        className={`${
          visibility ? "visible" : "hidden"
        } text-[15px] font-robotomono font[500] text-red-500 absolute ml-1 sm:mt-[-1.8rem] md:mt-[-1.7rem]`}
      >
        {ansWer.trim() === userAns[indexNumber] ? (
          <div className="mt-[15px]">
            {" "}
            <Tick></Tick>
          </div>
        ) : (
          ansWer
        )}
      </p>

      {/* <Select
          className={` ${visibility ? 'mt-[-2rem] ':""}`}
          // value={selected}
          onChange={(e)=>{handleSelect(indexNumber,e)}}
          size={6}
          onBlur={true}
          disabled={visibility ? true : false}
          style={{
            width: 90,
            height:25,
           
          }}
          options={options}
        /> */}

      <Select
        defaultValue={{
          label: `${visibility ? userAns[indexNumber]? userAns[indexNumber]:'' : ""} `,
          value: 0,
        }}
        style={{
          width: 110,
          height: 35,
        }}
        className={` ${visibility ? "mt-[-2rem] " : ""}`}
      >
        {options.map((val, index) => {
          return (
            <Option style={{ background: "" }} value={val.value}>
              {common.showOption ? val.lebel : ""}
            </Option>
          );
        })}
      </Select>
    </div>
  );
}
