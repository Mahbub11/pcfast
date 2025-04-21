import React, { useEffect, useState } from 'react'
import { Select, Space,Input, Modal } from "antd";
import ListData from '../../Components/Module/writing/ListData';
import { useDispatch, useSelector } from 'react-redux';
import PracticePageSAP from "../PracticeSpeaking/PracticePageSAP";
import "./index.css";

const { Search } = Input;

export default function ContainerPageSAP() {
  const { listSAP } = useSelector((state) => state.getSpeakingList);
   const dispatch= useDispatch()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [index, setIndex] = useState();
  const [show, isShow] = useState(false);
  const [tableData, setTableData] = useState(listSAP);
  const [filterData, setFilterData] = useState(listSAP);
  const [level, setLevel] = useState(false);
  const [fpracUnprac, setFpracUnprac] = useState(false);
  const [markedFilter, setMarkedFilter] = useState(false);
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };
  const handleQ = (id) => {
    setIndex(id);
    isShow(true);
  };

  const handleCloseModal=()=>{
    isShow(false);
  }

   
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

  useEffect(()=>{
   
        if (level) {
      const filteredVals = tableData.filter((entry) =>
        entry.level.toString().includes(level)  
        
      );
      setFilterData(filteredVals);
    }else if (fpracUnprac){
      const filteredVals = tableData.filter((entry) =>
     (entry.practice >0)
      
    );
    setFilterData(filteredVals);
    }else if (markedFilter){
      const filteredVals = tableData.filter((entry) =>
      (entry.bookmark === true)
    );
    setFilterData(filteredVals);
    }
    
    else {
      setFilterData(tableData);
    }

  },[level,fpracUnprac,markedFilter,tableData])

  const handleLevel=(e)=>{
    setLevel(e)
    setFpracUnprac(false)
    setMarkedFilter(false)
    
  }
  const handlePracticeFilter=(e)=>{
    setLevel(false)
    setFpracUnprac(e)
    setMarkedFilter(false)
    
  }

  const handleMarked=(e)=>{
    setLevel(false)
    setFpracUnprac(false)
    setMarkedFilter(e)
  }


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
        list={filterData.length ===0 ? listSAP :filterData}
          title="Speak about the Photo"
          type="rc-r"
          handleQ={handleQ}
        ></ListData>
      </div>
    </div>

    <div className="flex justify-center m-auto">
      <Modal
        style={config}
        footer={null}
        maskClosable={false}
        closable={false}
        // onCancel={closeModal}
        width="md:w-[100%] sm:w-full"
        open={show}
        className=" top-[1rem] m-auto z-10"
      >
        <div>
          <PracticePageSAP handleCloseModal={handleCloseModal} id={index}></PracticePageSAP>
        </div>
      </Modal>
    </div>
  </div>
  )
}
