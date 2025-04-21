import React from "react";
import { Tabs, Grid } from "antd";
import ContainerPageVRS from "../ModuleVocabulary/ContainerPageVRS";
import ContainerPageMockTest from "../ModuleMockTest/ContainerPageMockTest";

const { TabPane } = Tabs;
const { useBreakpoint } = Grid;


export default function MockTest() {
  const { lg } = useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
  const myFontSize = lg ? "50px" : "15px";

  return (
    <div>
      <Tabs
        tabBarGutter={myFontSize}
        fontSize="31px"
        defaultActiveKey="1"
        className="font-robotomono  border-none"
        style={{
          display: "flex",
          border: "none",
          justifyContent: "space-between",
        }}
      >
        <TabPane
          tab="Mock List"
          key="1"
          style={{ width: "100%", fontSize: "25px" }}
          >
         <ContainerPageMockTest></ContainerPageMockTest>
        </TabPane>
      </Tabs>
    </div>
  );
}
