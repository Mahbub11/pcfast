import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IeltsgetListOfSpeaking } from "../../../../redux/adminslice/IELTS/ielts_speaking";
import { Skeleton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import IeltsContainerTableAdmin from "../../../../Components/IELTS/Admin/IeltsContainerTableAdmin";
import IeltsCreateSpeaking from "./IeltsCreateSpeaking";

export default function IeltsContainerPageSpeaking() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.ielts_speaking);
  const [state, setState] = useState(true);
  const [busy, isBusy] = useState(true);
  const [type, setType] = useState(41);
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState(tableData);
  const [showCreate, setShowCreate] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [index, setIndex] = useState();
  const [show, isShow] = useState(false);
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };

  const handleQ = (id) => {
    setIndex(id);
    isShow(true);
  };

  useEffect(() => {
    dispatch(IeltsgetListOfSpeaking([], []));

    setFilterData(list)
    setTableData(list)
    isBusy(false);
  }, [showCreate, state]);

  console.log(list);
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
  const handlerefetch = () => {
    console.log("called");
    setState(!state);
  };
  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div>
          <div>
            <h1 className="text-center text-[25px] font-[500] px-2 py-2 underline">
              IELTS Speaking CRUD | Type:1
            </h1>
          </div>

          <div className="flex w-full justify-center">
            <Search
              className="md:w-[40%] sm:w-[20rem]  "
              placeholder="Search"
              enterButton
              onChange={handleSearch}
            />
            <div
              onClick={() => setShowCreate(!showCreate)}
              className="bg-gray-300/40 px-2 py-1 rounded-md"
            >
              {/* <Link to={'create'}> */}
              <PlusOutlined className="cursor-pointer"></PlusOutlined>

              {/* </Link> */}
            </div>
          </div>

          <div className="mt-10">
            <IeltsContainerTableAdmin
             handleQ={handleQ}
             title={'Speaking'}
             list={filterData}
            ></IeltsContainerTableAdmin>
          </div>

          <div className="mt-10">
          {showCreate ? (
                <div>
                 
                    <div>
                      <IeltsCreateSpeaking
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></IeltsCreateSpeaking>
                    </div>
                  
                </div>
              ) : (
                <div></div>
              )}


          </div>


        </div>
      )}
    </div>
  );
}
