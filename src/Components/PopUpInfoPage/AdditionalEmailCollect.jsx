import { Button, Input, Space } from "antd";
import React from "react";

export default function AdditionalEmailCollect({setSemail}) {
  return (
    <div>
      <div className="font-poppins">
        <div>
          <h1 className="text-[20px] font-[600]">
            Additional Information (Secondary E-mail){" "}
          </h1>
          <p className="mt-5">
            It helps you to avoid being accidentally locked out of your account
            by providing a backup in case you lose access to your primary email
            address
          </p>
        </div>
        <div className="mt-10 w-[60%]">
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input onChange={(e)=>setSemail(e.target.value)} placeholder="Enter a secondary E-mail" />
           
          </Space.Compact>
        </div>
      </div>
    </div>
  );
}
