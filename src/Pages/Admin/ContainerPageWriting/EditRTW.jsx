import React, { useState } from "react";
import { Input, Button, Space, List, Select, InputNumber, Upload } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { SaveVoc } from "../../../redux/adminslice/vocabulary";
import TextArea from "antd/es/input/TextArea";
import { SaveReading } from "../../../redux/adminslice/Reading";
import { UpdatWriting } from "../../../redux/adminslice/Writing";
import { useLocation } from "react-router-dom";

const options = [
  {
    value: 1,
    label: "Easy < 90",
  },
  {
    value: 2,
    label: "Medium < 110",
  },
  {
    value: 3,
    label: "Hard < 130",
  },
];
export default function EditeRTW() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [data, setData] = useState(state);
  const [ans, setAns] = useState(data.qa.a);
  const [time, setTime] = useState(data.time);
  const [level, setLevel] = useState(data.level);
  const [innerType, setInnerTypr] = useState(data.inner_type);
  const [question, setQuestion] = useState(state.qa.q);
  const [fquestion,setFquestion] = useState(state.qa.fq)
  const [fans,setFans] = useState(state.qa.fa)

  const handleSave = () => {

    const doc = {
      id: data.id,
      inner_type: innerType,
      qa: { a: ans, q: question,fa:fans,fq:fquestion },
      time,
      level,
      type: 2,
    };

    dispatch(UpdatWriting(doc));
  };

  return (
    <div className="w-[90%] m-auto h-auto block px-5 py-1">
      <div className="bg-gray-300/40 ">
        <h1 className="text-[25px] font-[500] text-center px-2 py-2 bg-gray-200/70">
          Edit-- Read then Write/Interactive Writing
        </h1>
        <div className="w-[70%] border-2 px-5 py-5 h-auto m-auto mt-10">
          <div className="h-auto flex flex-col gap-3">
            <Input
              style={{ height: "2rem" }}
              placeholder="Title of Test"
              disabled
              value={`${data.index} Read then Write/Interactive Writing`}
            />

            <div className="flex flex-col justify-between">
              <div>
                <div>
                  <TextArea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Write the Question"
                  ></TextArea>
                </div>

                <h1>Model Answer</h1>
                <Space.Compact style={{ width: "100%" }}>
                  <TextArea
                    value={ans}
                    onChange={(e) => setAns(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Space.Compact>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <h2 className="text-[20px] font-poppinsBold">Follow Up</h2>
              <div>
                <div>
                  <TextArea
                    value={fquestion}
                    onChange={(e) => setFquestion(e.target.value)}
                    placeholder="Write Follow-up Question"
                  ></TextArea>
                </div>

                <h1>Follow-up Answer</h1>
                <Space.Compact style={{ width: "100%" }}>
                  <TextArea
                     placeholder="Write Follow-up Ans"
                    value={fans}
                    onChange={(e) => setFans(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Space.Compact>
              </div>
            </div>

            <div className="flex gap-1 mt-3">
              <InputNumber
                min={1}
                max={10}
                value={time}
                onChange={(e) => setTime(e)}
              />
              <p className="text-[15px] mt-1">Minute</p>
            </div>
            <div className="flex gap-1 mt-3">
              <InputNumber value={2} disabled />
              <p className="text-[15px] mt-1">Type</p>
            </div>
            <div className="flex gap-1 mt-3">
              <InputNumber value={data.inner_type} disabled />
              <p className="text-[15px] mt-1">Inner Type(Q sub cat)</p>
            </div>
            <div className="flex gap-3">
              <Select
                placeholder="Select Level"
                optionFilterProp="children"
                onChange={(e) => setLevel(e)}
                options={options}
              />
              <p className="mt-1">
                {level === 1 ? (
                  <p>Easy</p>
                ) : level === 2 ? (
                  <p>Medium</p>
                ) : (
                  <p>Hard</p>
                )}{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[80%] m-auto bg-home flex justify-center px-2 py-2 rounded-md">
          <Button
            onClick={handleSave}
            className=" border-none text-[23px] mt-[-1rem]"
          >
            Save to DB
          </Button>
        </div>
      </div>
    </div>
  );
}
