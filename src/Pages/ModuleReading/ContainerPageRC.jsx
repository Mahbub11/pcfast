import React, { useEffect, useState } from "react";
import { Select, Space, Input, Modal } from "antd";
import ListData from "../../Components/Module/writing/ListData";
import { useDispatch, useSelector } from "react-redux";
import PracticePageRC from "../PracticeReading/PracticePageRC";
import "./index.css";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

export default function ContainerPageRC() {
  const { listRC } = useSelector((state) => state.getReadingList);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [tableData, setTableData] = useState(listRC);
  const [filterData, setFilterData] = useState(listRC);
  const [level, setLevel] = useState(false);
  const [fpracUnprac, setFpracUnprac] = useState(false);
  const [markedFilter, setMarkedFilter] = useState(false);
  const navigate = useNavigate();
  const [index, setIndex] = useState();
  const [show, isShow] = useState(false);
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };
  const handleQ = (id) => {
    navigate(`/practice/rc-r/${id}`);
    // setIndex(id);
    // isShow(true);
  };
  const handleCloseModal = () => {
    isShow(false);
  };

  console.log(listRC.length);
  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      setFilterData(tableData);
    } else {
      const newData = tableData.filter(
        (val) => val.index === parseInt(e.target.value)
      );

      setFilterData(newData);
    }
  };

  useEffect(() => {
    if (level) {
      const filteredVals = tableData.filter((entry) =>
        entry.level.toString().includes(level)
      );
      setFilterData(filteredVals);
    } else if (fpracUnprac) {
      const filteredVals = tableData.filter((entry) => entry.practice > 0);
      setFilterData(filteredVals);
    } else if (markedFilter) {
      const filteredVals = tableData.filter((entry) => entry.bookmark === true);
      setFilterData(filteredVals);
    } else {
      setFilterData(tableData);
    }
  }, [level, fpracUnprac, markedFilter, tableData]);

  const handleLevel = (e) => {
    setLevel(e);
    setFpracUnprac(false);
    setMarkedFilter(false);
  };
  const handlePracticeFilter = (e) => {
    setLevel(false);
    setFpracUnprac(e);
    setMarkedFilter(false);
  };

  const handleMarked = (e) => {
    setLevel(false);
    setFpracUnprac(false);
    setMarkedFilter(e);
  };

  // useEffect(() => {
  //   window.onbeforeunload = function () {
  //     return false;
  //   };
  //   return () => {
  //     window.onbeforeunload = null;
  //   };
  // }, []);

  return (
    <div className="relative">
      <div>
        <div className="flex justify-between">
          <div className="flex justify-between gap-2 flex-wrap">
            <Select
              onChange={(e) => handleLevel(e)}
              defaultValue="All Level"
              style={{ width: 120 }}
              options={[
                { value: false, label: "ALL" },
                { value: "1", label: "Easy" },
                { value: "2", label: "Medium" },
                { value: "3", label: "Hard" },
              ]}
            />
            <Select
              onChange={(e) => handlePracticeFilter(e)}
              defaultValue="Unpracticed"
              style={{ width: 120 }}
              options={[
                { value: 1, label: "Practiced" },
                { value: 0, label: "Unpracticed" },
              ]}
            />
            <Select
              title="Bookmark"
              onChange={(e) => handleMarked(e)}
              defaultValue="All"
              style={{ width: 120 }}
              options={[
                { value: 1, label: "Marked" },
                { value: 0, label: "ALL" },
              ]}
            />
          </div>
          <Search
            className="md:w-[40%] sm:w-[20rem] bg-blue-300 sm:h-[10%] rounded-md "
            placeholder="Search Question Number"
            onChange={handleSearch}
            enterButton
          />
        </div>

        <div className=" h-[20rem] w-full mt-10">
          <ListData
            list={filterData.length === 0 ? listRC : filterData}
            title="Read and Complete"
            type="rc-r"
            handleQ={handleQ}
          ></ListData>
        </div>
      </div>

      {/* <div className="flex justify-center m-auto">
        <Modal
          style={config}
          footer={null}
          maskClosable={false}
          closable={false}
          width="md:w-[100%] sm:w-full"
          open={show}
          className=" top-[1rem] m-auto z-10"
        >
          <div>
            <PracticePageRC
              handleCloseModal={handleCloseModal}
              id={index}
            ></PracticePageRC>
          </div>
        </Modal>
      </div> */}
    </div>
  );
}
