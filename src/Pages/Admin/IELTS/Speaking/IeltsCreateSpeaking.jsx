import React, { useState } from "react";
import { Input, Button, Space, List, Select, InputNumber, Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { ShowNotification } from "../../../../redux/actions";
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

export default function IeltsCreateSpeaking({ refetch, length }) {
  const dispatch = useDispatch();
  const [time, setTime] = useState(1);
  const [level, setLevel] = useState(1);
  const [question, setQuestion] = useState();
  const { error } = useSelector((state) => state.speaking);
 const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  
  const handleSave = () => {
    if (!question) {
      dispatch(
        ShowNotification({
          severity: "error",
          message: "Question Field is Required",
        })
      );

      return;
    }

    const doc = {
      qa: {
        q: question,
      },
      time,
      level,
      type: 1,
    };

    //   dispatch(SaveSpeaking(doc));
    refetch();
  };

 
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <div>
      <div className="w-[90%] m-auto h-auto block px-5 py-1">
        <div className="bg-gray-300/40 ">
          <h1 className="text-[25px] font-[500] text-center px-2 py-2 bg-gray-200/70">
            Add--[ Speaking ]
          </h1>
          <div className="w-[70%] border-2 px-5 py-5 h-auto m-auto mt-10">
            <div className="h-auto flex flex-col gap-3">
              <Input
                style={{ height: "2rem" }}
                placeholder="Title of Test"
                disabled
                value={`${++length} Speaking`}
              />

              <div className="h-[20rem] w-full bg-home/10">
                <div>
                    <h2> Part 1</h2>
                    <div>
                    <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
                    </div>
                </div>


               
              </div>

              <div className="flex gap-1 mt-3">
                <div className="flex  px-2">
                  <InputNumber value={time} onChange={(e) => setTime(e)} />
                  <p className="text-[15px] mt-1">minute</p>
                </div>
              </div>
              <div className="flex gap-1">
                <InputNumber value={1} disabled />
                <p className="text-[15px] mt-1">Type</p>
              </div>
              <div className="flex gap-1">
                <Radio.Group
                  onChange={(e) => setLevel(e.target.value)}
                  defaultValue="a"
                >
                  <Radio.Button value={1}>{"Easy"}</Radio.Button>
                  <Radio.Button value={2}>{"Medium"}</Radio.Button>
                  <Radio.Button value={3}>{"Hard "}</Radio.Button>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className="w-[80%] m-auto bg-home flex justify-center px-2 py-2 rounded-md">
            <Button
              onClick={handleSave}
              className=" border-none text-[23px] mt-[-1rem]"
            >
              Save to DB
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
