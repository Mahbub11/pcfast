import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputNumber, Skeleton, List } from "antd";
import {
  deletePackage,
  getMockList,
  getPackageRequest,
  saveMockSet,
  savePackage,
  updateMockSet,
} from "../../../redux/adminslice/Package";
import { Space, Table, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Radio, Select } from "antd";
import ContainerTable from "../../../Components/Admin/ContainerTable";
import MockQuestionTable from "../../../Components/Admin/MockQuestionTable";
import { getModuleData } from "../../../redux/slices/auth";

function MockListManagement(props) {
  const dispatch = useDispatch();
  const [packageList, setPackageList] = useState([]);
  const [mockListData, setMockListData] = useState([]);
  const [busy, setBusy] = useState(true);
  const { list, mockList } = useSelector((state) => state.package);
  const [state, setState] = useState(0);
  const [section, setSection] = useState(0);
  const [module, setModule] = useState(0);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [modulePermission, setModulePermission] = useState();
  const [price, setPrice] = useState();
  const [day, setDay] = useState();
  const [planid, setPlanid] = useState();
  const [fetch, setFetch] = useState(true);
  const vocList = useSelector((state) => state.getVocList);
  const { listRC } = useSelector((state) => state.getReadingList);
  const { listInteractive } = useSelector((state) => state.getReadingList);

  const { listSAL } = useSelector((state) => state.getSpeakingList);
  const { listSAP } = useSelector((state) => state.getSpeakingList);
  const { listSLS } = useSelector((state) => state.getSpeakingList);
  const { listSRS } = useSelector((state) => state.getSpeakingList);
  const { listSS } = useSelector((state) => state.getSpeakingList);

  const { listRTW } = useSelector((state) => state.getWritingList);
  const { listWAP } = useSelector((state) => state.getWritingList);
  const { listWS } = useSelector((state) => state.getWritingList);

  const { listLLR } = useSelector((state) => state.getListeningList);
  const { listLLT } = useSelector((state) => state.getListeningList);
  const [data, setData] = useState([]);
  const [moduleItem, setModuleItem] = useState();
  const [nameInType, setNameType] = useState({});
  const [sectionOne, setSectionOne] = useState({
    31: [],
    51: [],
    11: [],
    41: [],
    21: [],
  });
  const [sectionTwo, setSectionTwo] = useState({
    32: [],
  });
  const [sectionThree, setSectionThree] = useState({
    52: [],
  });
  const [sectionForth, setSectionForth] = useState({
    22: [],
    44: [],
    42: [],
    43: [],
  });
  const [sectionFifth, setSectionFifth] = useState({
    45: [],
    23: [],
  });

  useEffect(() => {
    dispatch(getModuleData());
    dispatch(getPackageRequest());
    dispatch(getMockList());
    setPackageList(list);
    setMockListData(mockList);
    setPlanid(mockListData.length + 1);

    setBusy(false);
  }, [busy, state, fetch]);

  useEffect(() => {
    if (moduleItem === 21) {
      setNameType({
        title: "Write about the Photo",
        inner_type: 21,
        link: "wap-w",
      });
      setData(listWAP);
    } else if (moduleItem === 22) {
      setNameType({
        title: "Read then Write",
        inner_type: 22,
        link: "rtw-w",
      });
      setData(listRTW);
    } else if (moduleItem === 23) {
      setNameType({
        title: "Writing Sample",
        inner_type: 23,
        link: "rtw-w",
      });
      setData(listWS);
    } else if (moduleItem === 41) {
      setNameType({
        title: "Read Aloud",
        inner_type: 41,
        link: "sal-s",
      });
      setData(listSAL);
    } else if (moduleItem === 42) {
      setNameType({
        title: "Speak about the Photo",
        inner_type: 42,
        link: "sap-s",
      });
      setData(listSAP);
    } else if (moduleItem === 43) {
      setNameType({
        title: "Read then Speak",
        inner_type: 43,
        link: "srs-s",
      });
      setData(listSRS);
    } else if (moduleItem === 44) {
      setNameType({
        title: "Listen then Speak",
        inner_type: 44,
        link: "sls-s",
      });
      setData(listSLS);
    } else if (moduleItem === 45) {
      setNameType({
        title: "Speaking Sample",
        inner_type: 45,
        link: "ss-s",
      });
      setData(listSS);
    } else if (moduleItem === 31) {
      setNameType({
        title: "Read & Complete",
        inner_type: 31,
        link: "rc-r",
      });
      setData(listRC);
    } else if (moduleItem === 32) {
      setNameType({
        title: "Interactive Reading",
        inner_type: 32,
        link: "rcs-r",
      });
      setData(listInteractive);
    } else if (moduleItem === 51) {
      setNameType({
        title: "Listen and Type",
        inner_type: 51,
        link: "llt-l",
      });
      setData(listLLT);
    } else if (moduleItem === 52) {
      setNameType({
        title: "Listen and Respond",
        inner_type: 52,
        link: "llr-l",
      });
      setData(listLLR);
    } else if (moduleItem === 11) {
      setNameType({
        title: "Vocabulary Test",
        inner_type: 11,
        link: "vrs-v",
      });
      setData(vocList.list);
    }
  }, [moduleItem]);

  console.log(mockListData);

  const handlemodulePermission = (e) => {
    setModulePermission(e.target.value);
  };

  const handleModuleChange = (val) => {
    setModuleItem(val.target.value);
  };

  const handleQ = ({ id, inner_type }) => {
    if (module === 0) {
      setSectionOne({
        ...sectionOne,
        [inner_type]: [...sectionOne[inner_type], id],
      });
    } else if (module === 1) {
      setSectionTwo({
        ...sectionTwo,
        [inner_type]: [...sectionTwo[inner_type], id],
      });
    } else if (module === 2) {
      setSectionThree({
        ...sectionThree,
        [inner_type]: [...sectionThree[inner_type], id],
      });
    } else if (module === 3) {
      setSectionForth({
        ...sectionForth,
        [inner_type]: [...sectionForth[inner_type], id],
      });
    } else if (module === 4) {
      setSectionFifth({
        ...sectionFifth,
        [inner_type]: [...sectionFifth[inner_type], id],
      });
    }
  };

  const removeItem = (id, inner_type) => {
    if (module === 0) {
      setSectionOne({
        ...sectionOne,
        [inner_type]: sectionOne[inner_type].filter((item) => item !== id),
      });
    } else if (module === 1) {
      setSectionTwo({
        ...sectionTwo,
        [inner_type]: sectionTwo[inner_type].filter((item) => item !== id),
      });
    } else if (module === 2) {
      setSectionThree({
        ...sectionThree,
        [inner_type]: sectionThree[inner_type].filter((item) => item !== id),
      });
    } else if (module === 3) {
      setSectionForth({
        ...sectionForth,
        [inner_type]: sectionForth[inner_type].filter((item) => item !== id),
      });
    } else if (module === 4) {
      setSectionFifth({
        ...sectionFifth,
        [inner_type]: sectionFifth[inner_type].filter((item) => item !== id),
      });
    }
  };

  const handleSaveSet = () => {
    const data = {
      pro_plan: modulePermission,
      set: {
        31: sectionOne[31],
        51: sectionOne[51],
        11: sectionOne[11],
        41: sectionOne[41],
        21: sectionOne[21],

        32: sectionTwo[32],
        52: sectionThree[52],

        22: sectionForth[22],
        44: sectionForth[44],
        42: sectionForth[42],
        43: sectionForth[43],

        45: sectionFifth[45],
        23: sectionFifth[23],
      },
    };

    dispatch(saveMockSet(data));
    console.log(data);
  };

  const handleUpdateSet = () => {
    const data = {
      id: planid,
      pro_plan: modulePermission,
      set: {
        31: sectionOne[31],
        51: sectionOne[51],
        11: sectionOne[11],
        41: sectionOne[41],
        21: sectionOne[21],

        32: sectionTwo[32],
        52: sectionThree[52],

        22: sectionForth[22],
        44: sectionForth[44],
        42: sectionForth[42],
        43: sectionForth[43],

        45: sectionFifth[45],
        23: sectionFifth[23],
      },
    };

    dispatch(updateMockSet(data));
  };

  const handlePackageItem = (item) => {
    setSectionOne({
      31: item.set[31],
      51: item.set[51],
      11: item.set[11],
      41: item.set[41],
      21: item.set[21],
    });
    setSectionTwo({
      32: item.set[32],
    });
    setSectionThree({
      52: item.set[52],
    });
    setSectionForth({
      22: item.set[22],
      44: item.set[44],
      42: item.set[42],
      43: item.set[43],
    });
    setSectionFifth({
      45: item.set[45],
      23: item.set[23],
    });

    setPlanid(item.id);
    setModulePermission(item.pro_plan);

    console.log(item);
  };

  const handleSave = () => {
    const data = {
      name,
      description,
      module_permission: modulePermission,
      day,
      price,
    };

    dispatch(savePackage(data));
    setFetch(!fetch);
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (id, record) => <div>{<p>{record.id}</p>}</div>,
    },
    {
      title: "Pro Plan",
      dataIndex: "pro_plan",
      key: "pro_plan",
      render: (level, record) => (
        <div className="text-[21px] font-montserrat font-[400] ">
          {record.pro_plan === true ? "Yes" : "No"}
        </div>
      ),
    },
    {
      title: "Set",
      dataIndex: "set",
      key: "set",
      render: (type, record) => (
        <div className="text-[21px] font-montserrat font-[400] ">
          {
            // record.set
          }
        </div>
      ),
    },

    {
      title: "Action",
      dataIndex: "addition",
      key: "addition",
      render: (text, record) => (
        <div className="text-[21px] font-montserrat font-[400] md:flex md:gap-10 flex">
          <button
            onClick={() => {
              dispatch(deletePackage(record.id));
            }}
            className="bg-tahiti px-1 py-1 rounded-md"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleModuleView = (val) => {
    setModule(val);
    setData([]);
  };

  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div className="mt-10">
          <div>
            <h1 className="text-center text-[25px]">Mock List </h1>
            <div className="mt-10 w-full flex gap-2 h-[30rem]">
              <Table
                className="cursor-pointer overflow-y-scroll"
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      handlePackageItem(record);
                    }, // click row
                  };
                }}
                columns={columns}
                dataSource={mockListData}
              />
              <div className="flex w-full gap-2">
                <div className="w-[20%]">
                  {module === 0 ? (
                    <div>
                      <div>
                        <Radio.Group
                          value={moduleItem}
                          onChange={handleModuleChange}
                        >
                          <Radio.Button value={31}>
                            Read and Complete
                          </Radio.Button>
                          <Radio.Button value={51}>
                            Listen Then Type
                          </Radio.Button>
                          <Radio.Button value={11}>
                            Read and Select
                          </Radio.Button>
                          <Radio.Button value={41}>Read Aloud</Radio.Button>
                          <Radio.Button value={21}>
                            Write about the Photo
                          </Radio.Button>
                        </Radio.Group>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {module === 1 ? (
                    <div>
                      <Radio.Group
                        value={moduleItem}
                        onChange={handleModuleChange}
                      >
                        <Radio.Button value={32}>
                          Interactive Reading
                        </Radio.Button>
                      </Radio.Group>
                    </div>
                  ) : (
                    ""
                  )}
                  {module === 2 ? (
                    <div>
                      <Radio.Group
                        value={moduleItem}
                        onChange={handleModuleChange}
                      >
                        <Radio.Button value={52}>
                          Interactive Listening
                        </Radio.Button>
                      </Radio.Group>
                    </div>
                  ) : (
                    ""
                  )}
                  {module === 3 ? (
                    <div>
                      <div>
                        <Radio.Group
                          value={moduleItem}
                          onChange={handleModuleChange}
                        >
                          <Radio.Button value={22}>
                            Read then Write
                          </Radio.Button>
                          <Radio.Button value={44}>
                            Listen then Speak
                          </Radio.Button>
                          <Radio.Button value={42}>
                            Speak about the Photo
                          </Radio.Button>
                          <Radio.Button value={43}>
                            Read then Speak
                          </Radio.Button>
                        </Radio.Group>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {module === 4 ? (
                    <div>
                      <div>
                        <Radio.Group
                          value={moduleItem}
                          onChange={handleModuleChange}
                        >
                          <Radio.Button value={23}>Writing Sample</Radio.Button>
                          <Radio.Button value={45}>
                            Speaking Sample
                          </Radio.Button>
                        </Radio.Group>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-[80%]">
                  <MockQuestionTable
                    title={nameInType.title}
                    list={data}
                    handleQ={handleQ}
                    type={nameInType.link}
                  ></MockQuestionTable>
                </div>
              </div>
            </div>
            <h1 className="text-center text-[22px] text-red-400 font-[700]">
              Plan ID: {planid}
            </h1>
          </div>

          <div className="mt-10 flex gap-3 flex-wrap w-full">
            {section === 0 ? (
              <div>
                <div
                  className={`${
                    module === 0 ? "bg-home" : ""
                  } border-2 rounded-md px-2 py-2  h-[20rem] w-[20rem]`}
                >
                  <div className="flex gap-2 justify-center">
                    <h1 className="text-center text-[20px] underline">
                      First Section
                    </h1>
                    <button
                      onClick={() => handleModuleView(0)}
                      className="px-1  bg-tahiti"
                    >
                      Add
                    </button>
                  </div>

                  <div className="overflow-scroll h-[15rem] bg-header flex-col gap-3">
                    <div className="bg-pink-300 rounded-md px-2 py-2 ">
                      <p>Read & Complete</p>
                      <div className="flex gap-5 flex-wrap">
                        {sectionOne[31].map((item, index) => (
                          <div className="flex gap-1">
                            {item}
                            <DeleteOutlined
                              onClick={() => removeItem(item, 31)}
                            ></DeleteOutlined>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-pink-300 rounded-md px-2 py-2 mt-2">
                      <p>Read & Select</p>
                      <div className="flex gap-5 flex-wrap">
                        {sectionOne[11].map((item, index) => (
                          <div className="flex gap-1">
                            {item}
                            <DeleteOutlined
                              onClick={() => removeItem(item, 11)}
                            ></DeleteOutlined>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-pink-300 rounded-md px-2 py-2 mt-2">
                      <p>Listen then Type</p>
                      <div className="flex gap-5 flex-wrap">
                        {sectionOne[51].map((item, index) => (
                          <div className="flex gap-1">
                            {item}
                            <DeleteOutlined
                              onClick={() => removeItem(item, 51)}
                            ></DeleteOutlined>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-pink-300 rounded-md px-2 py-2 mt-2">
                      <p>Read Aloud</p>
                      <div className="flex gap-5 flex-wrap">
                        {sectionOne[41].map((item, index) => (
                          <div className="flex gap-1">
                            {item}
                            <DeleteOutlined
                              onClick={() => removeItem(item, 41)}
                            ></DeleteOutlined>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-pink-300 rounded-md px-2 py-2 mt-2">
                      <p>Write about the Photo</p>
                      <div className="flex gap-5 flex-wrap">
                        {sectionOne[21].map((item, index) => (
                          <div className="flex gap-1">
                            {item}
                            <DeleteOutlined
                              onClick={() => removeItem(item, 21)}
                            ></DeleteOutlined>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {section === 0 ? (
              <div>
                <div
                  className={`${
                    module === 1 ? "bg-home" : ""
                  } border-2 rounded-md px-2 py-2  h-[20rem] w-[20rem]`}
                >
                  <div className="flex gap-2 justify-center">
                    <h1 className="text-center text-[20px] underline">
                      Second Section
                    </h1>
                    <button
                      onClick={() => handleModuleView(1)}
                      className="px-1  bg-tahiti"
                    >
                      Add
                    </button>
                  </div>

                  <div className="px-3 py-3 flex gap-3">
                    <div className="bg-pink-300 rounded-md px-2 py-2 mt-2">
                      <p>Interactive Reading</p>
                      <div className="flex gap-5 flex-wrap">
                        {sectionTwo[32].map((item, index) => (
                          <div className="flex gap-1">
                            {item}
                            <DeleteOutlined
                              onClick={() => removeItem(item, 32)}
                            ></DeleteOutlined>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {section === 0 ? (
              <div>
                <div
                  className={`${
                    module === 2 ? "bg-home" : ""
                  } border-2 rounded-md px-2 py-2  h-[20rem] w-[20rem]`}
                >
                  <div className="flex gap-2 justify-center">
                    <h1 className="text-center text-[20px] underline">
                      Third Section
                    </h1>
                    <button
                      onClick={() => handleModuleView(2)}
                      className="px-1  bg-tahiti"
                    >
                      Add
                    </button>
                  </div>

                  <div>
                    <div className="bg-pink-300 rounded-md px-2 py-2 mt-2">
                      <p>Interactive Listening</p>
                      <div className="flex gap-5 flex-wrap">
                        {sectionThree[52].map((item, index) => (
                          <div className="flex gap-1">
                            {item}
                            <DeleteOutlined
                              onClick={() => removeItem(item, 52)}
                            ></DeleteOutlined>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {section === 0 ? (
              <div>
                <div
                  className={`${
                    module === 3 ? "bg-home" : ""
                  } border-2 rounded-md px-2 py-2  h-[20rem] w-[20rem]`}
                >
                  <div className="flex gap-2 justify-center">
                    <h1 className="text-center text-[20px] underline">
                      Forth Section
                    </h1>
                    <button
                      onClick={() => handleModuleView(3)}
                      className="px-1  bg-tahiti"
                    >
                      Add
                    </button>
                  </div>

                  <div>
                    <div className="bg-pink-300 rounded-md px-2 py-2 ">
                      <p>Read then Write</p>
                      <div className="flex gap-5 flex-wrap">
                        {sectionForth[22].map((item, index) => (
                          <div className="flex gap-1">
                            {item}
                            <DeleteOutlined
                              onClick={() => removeItem(item, 22)}
                            ></DeleteOutlined>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-pink-300 rounded-md px-2 py-2 mt-3">
                      <p>Listen then Speak</p>
                      <div className="flex gap-5 flex-wrap">
                        {sectionForth[44].map((item, index) => (
                          <div className="flex gap-1">
                            {item}
                            <DeleteOutlined
                              onClick={() => removeItem(item, 44)}
                            ></DeleteOutlined>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-pink-300 rounded-md px-2 py-2 mt-2">
                      <p>speak about the Photo</p>
                      <div className="flex gap-5 flex-wrap">
                        {sectionForth[42].map((item, index) => (
                          <div className="flex gap-1">
                            {item}
                            <DeleteOutlined
                              onClick={() => removeItem(item, 42)}
                            ></DeleteOutlined>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-pink-300 rounded-md px-2 py-2 mt-2">
                      <p>Read then Speak</p>
                      <div className="flex gap-5 flex-wrap">
                        {sectionForth[43].map((item, index) => (
                          <div className="flex gap-1">
                            {item}
                            <DeleteOutlined
                              onClick={() => removeItem(item, 43)}
                            ></DeleteOutlined>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {section === 0 ? (
              <div>
                <div
                  className={`${
                    module === 4 ? "bg-home" : ""
                  } border-2 rounded-md px-2 py-2  h-[20rem] w-[20rem]`}
                >
                  <div className="flex gap-2 justify-center">
                    <h1 className="text-center text-[20px] underline">
                      Fifth Section
                    </h1>
                    <button
                      onClick={() => handleModuleView(4)}
                      className="px-1  bg-tahiti"
                    >
                      Add
                    </button>
                  </div>

                  <div>
                    <div className="bg-pink-300 rounded-md px-2 py-2 ">
                      <p>Writing Sample</p>
                      <div className="flex gap-5 flex-wrap">
                        {sectionFifth[23].map((item, index) => (
                          <div className="flex gap-1">
                            {item}
                            <DeleteOutlined
                              onClick={() => removeItem(item, 23)}
                            ></DeleteOutlined>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-pink-300 rounded-md px-2 py-2 ">
                      <p>Speaking Sample</p>
                      <div className="flex gap-5 flex-wrap">
                        {sectionFifth[45].map((item, index) => (
                          <div className="flex gap-1">
                            {item}
                            <DeleteOutlined
                              onClick={() => removeItem(item, 45)}
                            ></DeleteOutlined>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div>
              <h1 className="text-[20px] py-2">Is Pro Plan</h1>
              <Radio.Group
                value={modulePermission}
                onChange={handlemodulePermission}
              >
                <Radio.Button value={true}>Grant</Radio.Button>
                <Radio.Button value={false}>Not Grant</Radio.Button>
              </Radio.Group>
            </div>
          </div>

          <div className="gap-5 flex flex-col w-[40%] px-2 py-5 m-auto">
            <button
              onClick={handleSaveSet}
              className="bg-pink-400 px-2 py-2 h-10 flex justify-center w-full"
            >
              Save Set (Double Check Before Save)
            </button>
            <button
              onClick={handleUpdateSet}
              className="bg-pink-400 px-2 py-2 h-10 flex justify-center w-full"
            >
              Update Set (Double Check Before Update)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MockListManagement;
