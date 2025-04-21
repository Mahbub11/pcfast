import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, List, Radio, Space, Tag, Input } from "antd";
import { Pagination, PaginationProps, Row, Select, Table } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function MockListData({ type, list, title, handleQ }) {
  const [page, setPage] = useState(5);
  const [current, setCurrent] = useState(1);


  const columns = [
    {
      title: "Module Name",
      dataIndex: "name",
      key: "name",
      render: (id, record) => (
        <div>
          {record.practice ? (
            
            <p 
            className=" sm:text-[15px] md:text-[21px] font-montserrat font-[500] flex gap-2" onClick={(event) => event.preventDefault()}>
              <p>{record.index}.</p>
            <p>{title}</p>
            </p>
          ) : (
            <Link target="_self"
            to={`/duolingo/${type}/mset-${record.index}`}
            className="disabled:link sm:text-[15px] md:text-[21px] font-montserrat font-[400] flex gap-2" >
              <p>{record.index}.</p>
            <p>{title}</p>
            </Link>
          )}
          {/* {
            <Link
            
              target="_self"
              to={`/duolingo/${type}/mset-${record.index}`}
              className="disabled:link sm:text-[15px] md:text-[21px] font-montserrat font-[400] flex gap-2"
            >
              <p>{record.index}.</p>
              <p>{title}</p>
            </Link> 
          } */}
        </div>
      ),
    },
    {
      title: "Practiced",
      dataIndex: "practice",
      key: "practice",
      render: (level, record) => (
        <div className="text-[21px] font-montserrat font-[400] ">
          {record.practice ? (
            <div>
              <Tag color="magenta">Completed</Tag>
              <Tag color="">Result:{Math.round(record.practice.result)}</Tag>
            </div>
          ) : (
            <Tag color="blue">No Completed</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Addition",
      dataIndex: "addition",
      key: "addition",
      render: (text, record) => (
        <div
          key={record.id}
          className="text-[21px] mt-2 font-montserrat font-[400] md:flex md:gap-10 "
        >
          <Tag className="h-6 shadow-sm" color="blue">
            Total Attempt: {record.total_tested}
          </Tag>
        </div>
      ),
    },
  ];

  const handleChange = (value) => {
    setPage(value);
  };

  const onChangePage = (page) => {
    console.log(page);
    setCurrent(page);
  };

  const handleClick = (myLink) => () => {
    window.location.href = myLink;
  };
  return (
    <div className="m-aut flex flex-col justify-center sm:pb-5">
      <div className="sm:w-full md:w-[90%] m-auto text-[21px] sm:overflow-scroll md:overflow-hidden">
        <Table
       locale={{ emptyText: (<span>
        Loading....
        </span>)
       }}
          dataSource={list}
          columns={columns}
          rowClassName="bg-[#f8f9fa] "
          showHeader={false}
          style={{ fontSize: "20px" }}
          pagination={{
            pageSize: page,
            current: current,
            style: { display: "none" },
          }}
        />

        <div className="flex justify-center mt-5">
          <Select
            defaultValue={5}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              {
                value: 5,
                label: "5",
              },
            ]}
          />

          <Pagination
            current={current}
            pageSize={page}
            onChange={onChangePage}
            total={list.length}
            // itemRender={itemRender}
          />
        </div>
      </div>

      {/* <List
        pagination={{
          position,
          align,
          default:4
        }}
        size="small"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <div className="flex justify-between w-full sm:h-[5rem] h-[3rem] ">
              <Link
                // onClick={handleClick(`/practice/${type}/${index}`)}
                to={(`/practice/${type}`)} state={{ id:index }}
                className="cursor-pointer sm:text-[17px] md:text-[19px] font-montserrat font-[400] flex gap-2"
                >
                <h1>
                  {" "}
                  {++index}. {listName}
                </h1>

                <div className="font-[500]">
                  <Tag className="h-6" color="volcano">
                    {"Easy <90"}
                  </Tag>
                  <Tag className="h-6" color="orange">
                    Unpracticed
                  </Tag>
                </div>
              </Link>

              <div className="m-auto font-[500]">
                <Tag color="blue"> Total Attempt:122</Tag>
              </div>
            </div>
          </List.Item>
        )}

        
      />
      <Pagination
            total={100} pageSize={6} showLessItems
          /> */}
    </div>
  );
}
