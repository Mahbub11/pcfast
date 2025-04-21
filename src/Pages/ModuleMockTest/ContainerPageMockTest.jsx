import React, { useEffect, useState } from "react";
import { Select, Input, Skeleton, Modal } from "antd";
import ListData from "../../Components/Module/writing/ListData";
import { useDispatch, useSelector } from "react-redux";
import { getVocabularyList } from "../../redux/slices/getVocList";
import PracticePageVRS from "../PracticeVocabulary/PracticePageVRS";
import "./index.css";
import MockListData from "../../Components/MockTest/ListTable/MockListDate";
import { getModuleData } from "../../redux/slices/auth";
import { getMockList } from "../../redux/adminslice/Package";
import { getUserMockList, getUserMockResult } from "../../redux/slices/mockData";
const { Search } = Input;

export default function ContainerPageMockTest() {
  const dispatch= useDispatch()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const { mockList, resultList } = useSelector((state) => state.mockData);
  const [busy,setBusy]= useState(true)
  

  useEffect(()=>{
    dispatch(getModuleData());
    // dispatch(getUserMockResult())
    dispatch(getUserMockList(resultList));
    setBusy(false)
  
  },[busy])

  // useEffect(()=>{
  //  if(!busy){
  //   window.location.reload();
  //  }
  // },[busy])


  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };

  

  return (
    <div className="relative">
      {
        busy ? <Skeleton></Skeleton>:
        <div>
        <div className=" h-[20rem] w-full mt-10">
          <MockListData
            title={"Mock Test"}
            list={mockList}
            type="mock"
          ></MockListData>
        </div>
      </div>
      }
    </div>
  );
}
