import React, { useEffect, useState } from "react";
import { Radio, Button, Modal } from "antd";
import { DatePicker, Space } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Skeleton, Collapse } from "antd";
const { RangePicker } = DatePicker;

export default function Statistic() {
  const [flag, setFlag] = useState(6);
  const [size, setSize] = useState("middle");
  const [dateRange, setDateRange] = useState([]);
  const [busy, setBusy] = useState(true);
  const {
    statReading,
    statWriting,
    statVocabulary,
    statSpeaking,
    statListening,
    statLiteracy,
    statComprension,
    statProduction,
    statConversation,
    statData,
  } = useSelector((state) => state.statistic);


  const [data, setData] = useState({
    labels: statVocabulary.map(
      (data) => `${moment(data.createdAt).format("DD-MM")}`
    ),
    datasets: [
      {
        label: "Vocabularay",
        data: statVocabulary.map((data) => data.result),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  console.log(statVocabulary);
  useEffect(() => {
    if (statVocabulary.length > 0) {
      setBusy(false);
    }
  }, [busy]);

  useEffect(() => {
    if (flag === 6) {
      const sortedData = getData(dateRange[0], dateRange[1], statVocabulary);

      setData({
        labels: sortedData.map(
          (data) => `${moment(data.createdAt).format("DD-MM")}`
        ),
        datasets: [
          {
            label: "Vocabularay",
            data: sortedData.map((data) => data.result),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });


    } else if (flag === 7) {
      const sortedData = getData(dateRange[0], dateRange[1], statReading);
      setData({
        labels: sortedData.map(
          (data) => `${moment(data.createdAt).format("DD-MM")}`
        ),
        datasets: [
          {
            label: "Reading",
            data: sortedData.map((data) => data.result),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    } else if (flag === 8) {
      const sortedData = getData(dateRange[0], dateRange[1], statWriting);
      setData({
        labels: sortedData.map(
          (data) => `${moment(data.createdAt).format("DD-MM")}`
        ),
        datasets: [
          {
            label: "Writing",
            data: sortedData.map((data) => data.result),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    } else if (flag === 9) {
      const sortedData = getData(dateRange[0], dateRange[1], statSpeaking);
      setData({
        labels: sortedData.map(
          (data) => `${moment(data.createdAt).format("DD-MM")}`
        ),
        datasets: [
          {
            label: "Speaking",
            data: sortedData.map((data) => data.result),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    } else if (flag === 10) {
      const sortedData = getData(dateRange[0], dateRange[1], statListening);
      setData({
        labels: sortedData.map(
          (data) => `${moment(data.createdAt).format("DD-MM")}`
        ),
        datasets: [
          {
            label: "Listening",
            data: sortedData.map((data) => data.result),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }else if (flag === 1) {
      const sortedData = getData(dateRange[0], dateRange[1], statLiteracy);
      setData({
        labels: sortedData.map(
          (data) => `${moment(data.createdAt).format("DD-MM")}`
        ),
        datasets: [
          {
            label: "Literacy",
            data: sortedData.map((data) => data.result),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }else if (flag === 2) {
      const sortedData = getData(dateRange[0], dateRange[1], statComprension);
      setData({
        labels: sortedData.map(
          (data) => `${moment(data.createdAt).format("DD-MM")}`
        ),
        datasets: [
          {
            label: "Comprehension",
            data: sortedData.map((data) => data.result),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }else if (flag === 3) {
      const sortedData = getData(dateRange[0], dateRange[1], statProduction);
      setData({
        labels: sortedData.map(
          (data) => `${moment(data.createdAt).format("DD-MM")}`
        ),
        datasets: [
          {
            label: "Production",
            data: sortedData.map((data) => data.result),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }else if (flag === 4) {
      const sortedData = getData(dateRange[0], dateRange[1], statConversation);
      setData({
        labels: sortedData.map(
          (data) => `${moment(data.createdAt).format("DD-MM")}`
        ),
        datasets: [
          {
            label: "Conversation",
            data: sortedData.map((data) => data.result),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }
  }, [flag, dateRange]);

  function getData(start, end, data) {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    return data.filter((item) => {
      console.log(item);
      const itemTime = new Date(item.createdAt).getTime();

      return itemTime >= startTime && itemTime <= endTime;
    });
  }

  const onChange = (date, dateString) => {
    setDateRange(dateString);
    console.log(dateString);
  };




  return (
    <div>
      {false ? (
        <Skeleton></Skeleton>
      ) : (
        <div className=" h-full w-full md:px-5 md:py-4 sm:mt-[2rem] md:mt-0">
          <div className="md:flex md:flex-row sm:flex sm:flex-col justify-between md:gap-[5rem] sm:gap-2  w-full">
            <div
              className="sm:h-auto md:h-auto md:w-[70%] sm:w-full shadow-sm 
            flex justify-center m-auto items-center"
            >
              <div className="bg-header/30 px-2 rounded-sm py-3 sm:w-[20rem] md:w-[40rem]">
                <Space direction="vertical">
                  <RangePicker onChange={onChange} size={size} />
                </Space>
                <Line data={data}></Line>
               
              </div>
            </div>
            <div className="flex flex-col md:w-[40%] sm:w-full bg-header/30 rounded-sm ">
              <div className="h-min md:px-2 mr-[23px] md:py-2 sm:px-1 sm:py-2 self-center">
                <h1 className="font-montserrat text-[20px] ml-1 underline py-2 font-[600]">
                  Module
                </h1>
                <div className="">
                  <Radio.Group
                    defaultValue={6}
                    buttonStyle="solid"
                    onChange={(e) => setFlag(e.target.value)}
                  >
                    <div className="md:flex md:flex-col sm:flex sm:flex-row gap-3 sm:flex-wrap font-montserrat">
                      <Radio.Button
                        style={{
                          background: flag === 6 ? "#3AB7BF" : "#FFFF",
                          color: flag === 6 ? "#FFFF" : "	#000000",
                          fontFamily: "inherit",
                        }}
                        value={6}
                      >
                        VOCABULARY
                      </Radio.Button>
                      <div className="flex gap-1">
                        <Radio.Button
                          style={{
                            background: flag === 7 ? "#3AB7BF" : "#FFFF",
                            color: flag === 7 ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value={7}
                        >
                          READING
                        </Radio.Button>
                      </div>

                      <div className="flex gap-1 ">
                        <Radio.Button
                          style={{
                            background: flag === 8 ? "#3AB7BF" : "#FFFF",
                            color: flag === 8 ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value={8}
                        >
                          WRITING
                        </Radio.Button>
                      </div>

                      <div className="flex gap-1">
                        <Radio.Button
                          style={{
                            background: flag === 9 ? "#3AB7BF" : "#FFFF",
                            color: flag === 9 ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value={9}
                        >
                          SPEAKING
                        </Radio.Button>
                      </div>
                      <div className="flex gap-1">
                        <Radio.Button
                          style={{
                            background: flag === 10 ? "#3AB7BF" : "#FFFF",
                            color: flag === 10 ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value={10}
                        >
                          LISTENING
                        </Radio.Button>
                      </div>

                      <div>
                        <h1 className="font-poppins text-[17px] underline py-2 font-[600]">
                          Grand Score
                        </h1>
                      </div>

                      <div className="md:flex md:flex-col sm:flex sm:flex-row gap-3 sm:flex-wrap font-montserrat mt-[-10px]">
                        <Radio.Button
                      
                          style={{
                            background: flag === 1 ? "#3AB7BF" : "#FFFF",
                            color: flag === 1 ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value={1}
                        >
                          LITERACY
                        </Radio.Button>
                        <div className="flex gap-1">
                          <Radio.Button
                            style={{
                              background: flag === 2 ? "#3AB7BF" : "#FFFF",
                              color: flag === 2 ? "#FFFF" : "	#000000",
                              fontFamily: "inherit",
                            }}
                            value={2}
                          >
                            COMPREHENSION
                          </Radio.Button>
                        </div>

                        <div className="flex gap-1 ">
                          <Radio.Button
                            style={{
                              background: flag === 3 ? "#3AB7BF" : "#FFFF",
                              color: flag === 3 ? "#FFFF" : "	#000000",
                              fontFamily: "inherit",
                            }}
                            value={3}
                          >
                            PRODUCTION
                          </Radio.Button>
                        </div>

                        <div className="flex gap-1">
                          <Radio.Button
                            style={{
                              background: flag === 4 ? "#3AB7BF" : "#FFFF",
                              color: flag === 4 ? "#FFFF" : "	#000000",
                              fontFamily: "inherit",
                            }}
                            value={4}
                          >
                            CONVERSATION
                          </Radio.Button>
                        </div>
                      </div>
                    </div>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>
          
        </div>
     
      )}
    </div>
  );
}
