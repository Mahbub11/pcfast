import React, { useEffect, useState } from "react";
import { Layout,theme, Tabs, Grid } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as LoadingComponent } from "../../../Assets/SVG/IconLoadingBlock.svg";
import SpeakingQuestionList from "./SpeakingQuestionList";
import { IeltsgetListOfSpeaking } from "../../../redux/adminslice/IELTS/ielts_speaking";
const {  Content } = Layout;
const { useBreakpoint } = Grid;


export default function SpeakingModuleContainer() {
  const { lg } = useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
  const myFontSize = lg ? "130px" : "15px";
  const dispatch = useDispatch();
  const [busy, isBusy] = useState(true);

useEffect(()=>{
  dispatch(IeltsgetListOfSpeaking([], []));

},[])


  const items = [
    {
      key: 1,
      label: <span className="sm:text-[15px] md:text-[40px]">Speaking</span>,
      children:<SpeakingQuestionList></SpeakingQuestionList>
    },
    // {
    //   key: 2,
    //   label: <span className="sm:text-[15px] md:text-[30px]">Information</span>,
    //   children: <InfomationWriting></InfomationWriting>
    // },
    {
      key: 3,
      label: <span className="sm:text-[15px] md:text-[30px]">Suggestion & Tips</span>,
      children: <div>Suggestion and Tips</div>
    },
    // {
    //   key: 4,
    //   label: <span className="sm:text-[15px] md:text-[30px]">Notes</span>,
    //   children: "Content of Tab Pane 1",
    // },
  ];

  return (
    <div>
      {
        false ? <LoadingComponent></LoadingComponent>:
        <Layout className="h-screen ">
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
          background:"#f8f9fa"
        }}
      >
        <Tabs
          centered
          tabBarGutter={myFontSize}
          defaultActiveKey="1"
          className="bg-home md:h-[5.4rem] sm:h-[3rem]"
          items={items}
        ></Tabs>
      </Content>
    </Layout>
      }
    </div>
  );
}
