import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  BookOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, notification, Tabs, Grid, Skeleton } from "antd";
import "./index.css";
import { Link, Outlet } from "react-router-dom";
import IconWritingSign from "../../Assets/SVG/IconWritingSign";
import { useDispatch, useSelector } from "react-redux";
import { CloseNotification } from "../../redux/actions";
import { SmileOutlined,ExclamationOutlined,CheckOutlined  } from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

export default function SectionContainerLayout() {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [collapsed, setCollapsed] = useState(true);
  const { common } = useSelector((state) => state.app);
  const { userInfo } = useSelector((state) => state.auth);
  const [busy, isBusy] = useState(true);

 

  useEffect(() => {
   
    if (common?.message && common.severity !== 'error') {
      console.log(common)
       openNotificationWithIcon(common.severity);
    }
      dispatch(CloseNotification());
  }, [common?.message]);

  const openNotificationWithIcon = (type) => {
    api.open({
      message:  common.severity ==='Attention'? <strong className="text-yellow-400">{common.severity}</strong>:'',
      description: common.message,
      placement: "top",
      icon: (
        common.severity ==='Attention'?
        <ExclamationOutlined style={{
          color: 'yellow',
        }}></ExclamationOutlined>:
        <CheckOutlined
          style={{
            color: '#108ee9',
          }}
        />
      ),
    });
  };

  return (
    <div>
      {false ? (
        <Skeleton></Skeleton>
      ) : (
        <Layout className="bg-#e0ebf8 h-auto m-auto w-full">
          {contextHolder}
          <Sider
            className={`${collapsed ? "hidden" : "block"}`}
            trigger={null}
            collapsible
            translate="3s"
            collapsed={false}
            style={{ background: "#e0ebf8" }}
          >
            <div className=" h-auto" />
            <Menu
              theme="light"
              mode="inline"
              className="md:mt-[5rem] bg-transparent"
              defaultSelectedKeys={["1"]}
              inlineCollapsed={collapsed}
              items={[
                {
                  label: (
                    <a href="/" rel="noopener noreferrer">
                      Home
                    </a>
                  ),
                  key: "home",
                  icon: <HomeOutlined />,
                },
                {
                  label: "Practice",
                  key: "access-control",
                  icon: <IconWritingSign></IconWritingSign>,
                  collapsed: "block",

                  children: [
                    {
                      label: (
                        <a
                          href="/ielts/module/speaking"
                          rel="noopener noreferrer"
                        >
                          Speaking
                        </a>
                      ),
                      path: "duolingo/module/speaking",
                      key: "user2",
                      permission: "user list",
                    },
                    {
                      label: (
                        <a
                          href="/ielts/module/writing"
                          rel="noopener noreferrer"
                        >
                          Writing
                        </a>
                      ),
                      path: "/module/writing",
                      key: "user",
                      permission: "user list",
                    },
                  ],
                },
                {
                  label: (
                    <a href="/materials" rel="noopener noreferrer">
                      Materials
                    </a>
                  ),
                  key: "materials",
                  icon: <BookOutlined />,
                },
              ]}
            ></Menu>
          </Sider>
          <Layout>
            <Header
              className="flex justify-between z-50"
              style={{
                padding: 0,
                background: "#e0ebf8",
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <title
                className="sm:text-[30px] md:text-[40px]  bg-gradient-to-r
         from-blue-600 via-green-600 to-indigo-500 inline-block text-transparent bg-clip-text
          text-center text-[22px] font-lobster font-[700] drop-shadow-md w-auto"
              >
                <Link to={"/"}>PracticeCompanions</Link>
              </title>
              <div></div>
            </Header>
            <div className="h-auto bg-[#eff2f69a]">
              <div className="md:w-[90%] sm:w-full m-auto mt-5 relative ">
                <Outlet></Outlet>
              </div>
            </div>
          </Layout>
        </Layout>
      )}
    </div>
  );
}
