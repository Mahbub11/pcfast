import { Button, Input, Space } from "antd";
import { Radio } from "antd";
import React, { useState } from "react";

export default function AdditionalDesireScore({ds,setDS}) {
 

  return (
    <div>
      <div className="font-poppins">
        <div>
          <h1 className="text-[20px] font-[600]">Additional Information</h1>
        </div>

        <div className="h-min w-auto mt-10">
          <h1 className="font-montserrat text-[20px] font-[500] text-center">
            Desire Score
          </h1>

         <div className="flex justify-center w-full m-auto ml-5">
         <div className="mt-5 ">
            <Radio.Group
              buttonStyle="solid"
              onChange={(e) => setDS(e.target.value)}
            >
              <div className="flex gap-3 sm:flex-wrap font-montserrat">
                <div className="flex gap-1">
                  <Radio.Button
                    style={{
                      background: ds === "80-90" ? "#3AB7BF" : "#FFFF",
                      color: ds === "80-90" ? "#FFFF" : "	#000000",
                      fontFamily: "inherit",
                    }}
                    value="80-90"
                  >
                    5.0 / 80-90
                  </Radio.Button>
                </div>
                <div className="flex gap-1">
                  <Radio.Button
                    style={{
                      background: ds === "90-100" ? "#3AB7BF" : "#FFFF",
                      color: ds === "90-100" ? "#FFFF" : "	#000000",
                      fontFamily: "inherit",
                    }}
                    value="90-100"
                  >
                    5.5 / 90-100
                  </Radio.Button>
                </div>
                <div className="flex gap-1">
                  <Radio.Button
                    style={{
                      background: ds === "105-115" ? "#3AB7BF" : "#FFFF",
                      color: ds === "105-115" ? "#FFFF" : "	#000000",
                      fontFamily: "inherit",
                    }}
                    value="105-115"
                  >
                     6.0 / 80-90
                  </Radio.Button>
                </div>
                <div className="flex gap-1">
                  <Radio.Button
                    style={{
                      background: ds === "120-125" ? "#3AB7BF" : "#FFFF",
                      color: ds === "120-125" ? "#FFFF" : "	#000000",
                      fontFamily: "inherit",
                    }}
                    value="120-125"
                  >
                      6.5 / 120-125
                  </Radio.Button>
                </div>
                <div className="flex gap-1">
                  <Radio.Button
                    style={{
                      background: ds === "130-135" ? "#3AB7BF" : "#FFFF",
                      color: ds === "130-135" ? "#FFFF" : "	#000000",
                      fontFamily: "inherit",
                    }}
                    value="130-135"
                  >
                    7.0 / 130-135
                  </Radio.Button>
                </div>
                <div className="flex gap-1">
                  <Radio.Button
                    style={{
                      background: ds === "140-145" ? "#3AB7BF" : "#FFFF",
                      color: ds === "140-145" ? "#FFFF" : "	#000000",
                      fontFamily: "inherit",
                    }}
                    value="140-145"
                  >
                     7.5 / 140-145
                  </Radio.Button>
                </div>
                <div className="flex gap-1">
                  <Radio.Button
                    style={{
                      background: ds === "150-155" ? "#3AB7BF" : "#FFFF",
                      color: ds === "150-155" ? "#FFFF" : "	#000000",
                      fontFamily: "inherit",
                    }}
                    value="150-155"
                  >
                       8.0 / 150-155
                  </Radio.Button>
                </div>
                <div className="flex gap-1">
                  <Radio.Button
                    style={{
                      background: ds === "155-160" ? "#3AB7BF" : "#FFFF",
                      color: ds === "155-160" ? "#FFFF" : "	#000000",
                      fontFamily: "inherit",
                    }}
                    value="155-160"
                  >
                       8.5-9 / 155-160
                  </Radio.Button>
                </div>
              </div>
            </Radio.Group>
          </div>
         </div>
        </div>
      </div>
    </div>
  );
}
