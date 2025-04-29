import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMockList } from "../../redux/adminslice/Package";
import { Skeleton, List } from "antd";

function MockList(props) {
  const dispatch = useDispatch();
  const [busy, isBusy] = useState(true);
  const [mockDataList, setMockDataList] = useState([]);
  const { mockList } = useSelector((state) => state.package);

  useEffect(() => {
    dispatch(getMockList());
    setMockDataList(mockList);
    isBusy(false);
  }, [busy]);

  console.log(mockDataList);

  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div>
          <List
            size="small"
            header={<div className="text-center font-[500]">List</div>}
            bordered
            dataSource={mockDataList}
            renderItem={(item, index) => (
              <List.Item>
                <div className="flex gap-3">
                  <p>{item}</p>
                  <span
                    // onClick={(e) => handleSectionForthItemremove(index)}
                    className="cursor-pointer"
                  >
                    <button className="border-2 rounded-md px-1 py-1">
                      Start
                    </button>
                  </span>
                </div>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
}

export default MockList;
